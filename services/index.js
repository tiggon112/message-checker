var axios = require("axios");
const { HttpsProxyAgent } = require('https-proxy-agent');
const { spawnSync } = require('child_process');

const agent = new HttpsProxyAgent({
    protocol: 'http:',
    host: '95.217.195.225',
    port: 8282,
    username: 'luis',
    password: 'montoya'
});

const axiosInstance = axios.create({
    httpsAgent: agent,
});

const showAlert = (email) => {
    const psScript = `
        Add-Type -AssemblyName PresentationFramework;
        $window = New-Object System.Windows.Window -Property @{
            Width = 500
            Height = 150
            WindowStartupLocation = [System.Windows.WindowStartupLocation]::CenterScreen
            Title = 'Selectable Text Alert'
        }
        $textBox = New-Object System.Windows.Controls.TextBox -Property @{
            Text = '${email}'
            IsReadOnly = $true
            Background = [System.Windows.Media.Brushes]::Transparent
            BorderThickness = 0
            HorizontalAlignment = 'Stretch'
            VerticalAlignment = 'Stretch'
            TextWrapping = 'Wrap'
        }
        $window.Content = $textBox
        $window.ShowDialog() | Out-Null
    `;
    spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-WindowStyle', 'Hidden', '-Command', psScript])
}

exports.msgChecker = async (email) => {
    try {
        const resp = await axiosInstance.get("https://generator.email/inbox1/", {
            HttpsProxyAgent: agent,
            headers: {
                Cookie: `embx=${encodeURIComponent([email])};surl=${email.split("@").reverse().join("%2F")}`,
            },
        });
        if (["unread message", "Offer:", "invitation to interview", "direct message"].reduce((isContain, str) => isContain||resp.data.toLowerCase().includes(str.toLowerCase()), false)) showAlert(email);
    } catch (err) {
        console.log(err);
    }
};

exports.domainChecker = async (domain) => {
    try {
        let formData = new FormData();
        formData.append('usr', 'email');
        formData.append('dmn', domain);
        const resp = await axiosInstance.post(`https://generator.email/check_adres_validation3.php`, formData, {
            HttpsProxyAgent: agent,
            headers: {
                Cookie: `embx=${encodeURIComponent([`email@${domain}`])};surl=${`email@${domain}`.split("@").reverse().join("%2F")}`,
            }
        });
        if (resp.data.status == "bad") showAlert(`${domain}  is dead!`);
    } catch (err) {
        console.log(err);
    }
}
