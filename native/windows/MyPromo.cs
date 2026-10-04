// MyPromo for Windows — a window around the website, in a single small .exe.
//
// It does not hold the app; it opens https://mypromo-nu.vercel.app in the
// WebView2 engine that Windows 10 and 11 already carry (the same engine as
// Edge), so every change to the site reaches every laptop at once and there is
// nothing here to keep up to date. It is the Android shell's twin: a frame, an
// icon, and a way to say "no connection".
//
// One file, because it is meant to be read in a minute. Built with the csc that
// ships with Windows — see build.mjs. C# 5, because that is the compiler there.
//
// The three WebView2 libraries are embedded in the .exe and unpacked, once, to
// %LOCALAPPDATA%\MyPromo, so the download is one file and not four.

using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

[assembly: AssemblyTitle("MyPromo")]
[assembly: AssemblyProduct("MyPromo")]
[assembly: AssemblyDescription("MyPromo — تطبيق دفعتك")]
[assembly: AssemblyVersion("1.0.0.0")]

static class Program
{
    public const string Site = "https://mypromo-nu.vercel.app";
    static string home;

    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    static extern bool SetDllDirectory(string path);

    [STAThread]
    static void Main()
    {
        bool first;
        using (new Mutex(true, "MyPromoDesktop", out first))
        {
            // A second launch should not open a second copy of the app.
            if (!first) return;

            home = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "MyPromo");
            Unpack();
            SetDllDirectory(Path.Combine(home, "bin", Environment.Is64BitProcess ? "x64" : "x86"));
            AppDomain.CurrentDomain.AssemblyResolve += Resolve;

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Run();
        }
    }

    // Kept out of Main so the WebView2 types are not needed until the resolver
    // above is in place.
    [MethodImpl(MethodImplOptions.NoInlining)]
    static void Run()
    {
        Application.Run(new Window(Site, home));
    }

    static void Unpack()
    {
        Directory.CreateDirectory(Path.Combine(home, "bin", "x64"));
        Directory.CreateDirectory(Path.Combine(home, "bin", "x86"));
        Put("Microsoft.Web.WebView2.Core.dll", Path.Combine(home, "bin", "Microsoft.Web.WebView2.Core.dll"));
        Put("Microsoft.Web.WebView2.WinForms.dll", Path.Combine(home, "bin", "Microsoft.Web.WebView2.WinForms.dll"));
        Put("WebView2Loader.x64.dll", Path.Combine(home, "bin", "x64", "WebView2Loader.dll"));
        Put("WebView2Loader.x86.dll", Path.Combine(home, "bin", "x86", "WebView2Loader.dll"));
    }

    // Written only when it is missing or a different size, so a launch after
    // the first costs nothing and an update to the .exe replaces what changed.
    static void Put(string resource, string to)
    {
        using (Stream from = Assembly.GetExecutingAssembly().GetManifestResourceStream(resource))
        {
            if (from == null) return;
            if (File.Exists(to) && new FileInfo(to).Length == from.Length) return;
            try
            {
                using (FileStream file = File.Create(to)) from.CopyTo(file);
            }
            catch (IOException) { /* in use by another copy: it is the same file */ }
        }
    }

    static Assembly Resolve(object sender, ResolveEventArgs args)
    {
        string name = new AssemblyName(args.Name).Name;
        if (!name.StartsWith("Microsoft.Web.WebView2.")) return null;
        string path = Path.Combine(home, "bin", name + ".dll");
        return File.Exists(path) ? Assembly.LoadFrom(path) : null;
    }
}

class Window : Form
{
    readonly WebView2 view = new WebView2();
    readonly string site;
    readonly string home;

    // Where the app may go on its own. Anything else — a link out to a website,
    // a PDF host — opens in the browser the student already uses, and the app
    // stays where it was.
    static readonly string[] Inside = {
        "mypromo-nu.vercel.app", "supabase.co", "drive.google.com", "docs.google.com",
        "googleusercontent.com", "accounts.google.com"
    };

    public Window(string site, string home)
    {
        this.site = site;
        this.home = home;

        Text = "MyPromo";
        try { Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath); } catch (Exception) { }
        ClientSize = new Size(1180, 760);
        MinimumSize = new Size(440, 620);
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.FromArgb(0xF3, 0xF1, 0xE9);

        view.Dock = DockStyle.Fill;
        view.DefaultBackgroundColor = Color.FromArgb(0xF3, 0xF1, 0xE9);
        Controls.Add(view);

        Shown += async (s, e) => { await Start(); };
    }

    async System.Threading.Tasks.Task Start()
    {
        try
        {
            CoreWebView2Environment env = await CoreWebView2Environment.CreateAsync(null, Path.Combine(home, "data"));
            await view.EnsureCoreWebView2Async(env);
        }
        catch (Exception)
        {
            // Windows 10 before the 2021 updates has no WebView2 runtime.
            if (MessageBox.Show(
                "MyPromo needs Microsoft's WebView2 component, which this PC does not have yet.\n\nOpen the download page?",
                "MyPromo", MessageBoxButtons.YesNo, MessageBoxIcon.Information) == DialogResult.Yes)
            {
                Process.Start("https://go.microsoft.com/fwlink/p/?LinkId=2124703");
            }
            Close();
            return;
        }

        CoreWebView2 core = view.CoreWebView2;
        core.Settings.AreDevToolsEnabled = false;
        core.Settings.IsStatusBarEnabled = false;
        core.Settings.IsZoomControlEnabled = true;
        // The site reads this to know it is the laptop app: Google refuses to
        // sign in inside an embedded window, so the page hides that button.
        core.Settings.UserAgent = core.Settings.UserAgent + " MyPromoDesktop/1.0";

        core.NewWindowRequested += (s, e) => { e.Handled = true; Out(e.Uri); };
        core.NavigationStarting += (s, e) =>
        {
            if (!IsInside(e.Uri)) { e.Cancel = true; Out(e.Uri); }
        };
        core.NavigationCompleted += (s, e) =>
        {
            if (e.IsSuccess) return;
            switch (e.WebErrorStatus)
            {
                case CoreWebView2WebErrorStatus.CannotConnect:
                case CoreWebView2WebErrorStatus.ConnectionAborted:
                case CoreWebView2WebErrorStatus.ConnectionReset:
                case CoreWebView2WebErrorStatus.Disconnected:
                case CoreWebView2WebErrorStatus.HostNameNotResolved:
                case CoreWebView2WebErrorStatus.ServerUnreachable:
                case CoreWebView2WebErrorStatus.Timeout:
                    core.NavigateToString(Offline(site));
                    break;
            }
        };

        core.Navigate(site + "/feed");
    }

    static bool IsInside(string uri)
    {
        Uri u;
        if (!Uri.TryCreate(uri, UriKind.Absolute, out u)) return true;
        if (u.Scheme != "http" && u.Scheme != "https") return u.Scheme == "about" || u.Scheme == "data" || u.Scheme == "blob";
        foreach (string host in Inside)
            if (u.Host == host || u.Host.EndsWith("." + host)) return true;
        return false;
    }

    static void Out(string uri)
    {
        Uri u;
        if (!Uri.TryCreate(uri, UriKind.Absolute, out u)) return;
        if (u.Scheme != "http" && u.Scheme != "https") return;
        try { Process.Start(u.AbsoluteUri); } catch (Exception) { }
    }

    // Shown when the site cannot be reached. In Arabic, like the app.
    static string Offline(string site)
    {
        return "<!doctype html><html lang='ar' dir='rtl'><meta charset='utf-8'><title>MyPromo</title>"
            + "<body style=\"margin:0;min-height:100vh;display:grid;place-items:center;background:#F3F1E9;"
            + "font-family:'Segoe UI',Tahoma,sans-serif;color:#17201A;text-align:center\">"
            + "<div style='max-width:340px;padding:24px'>"
            + "<div style='width:72px;height:72px;margin:0 auto 18px;border-radius:22px;background:#2A5B3E;color:#fff;"
            + "display:grid;place-items:center;font-size:34px'>&#9888;</div>"
            + "<h2 style='margin:0 0 8px'>لا يوجد اتصال بالإنترنت</h2>"
            + "<p style='margin:0 0 22px;color:#6B6F69;line-height:1.8'>تحقّق من الشبكة ثم حاول مرة أخرى.</p>"
            + "<button onclick=\"location.href='" + site + "/feed'\" style='font:inherit;font-size:16px;font-weight:600;"
            + "border:0;border-radius:14px;padding:13px 32px;background:#2A5B3E;color:#fff;cursor:pointer'>إعادة المحاولة</button>"
            + "</div></body></html>";
    }
}
