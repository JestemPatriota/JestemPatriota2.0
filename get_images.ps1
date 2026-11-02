[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$targetDir = "C:\Users\lapaj\.gemini\antigravity\scratch\jestem-patriota\images"
if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir
}

# Download Husaria & Wojsko
$wc = New-Object System.Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")

$wc.DownloadFile("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800", "$targetDir\husaria.jpg")
$wc.DownloadFile("https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800", "$targetDir\wojsko.jpg")

Get-ChildItem $targetDir
