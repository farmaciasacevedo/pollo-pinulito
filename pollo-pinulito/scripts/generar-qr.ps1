param(
    [Parameter(Mandatory = $true)]
    [string]$Url
)
$ErrorActionPreference = 'Stop'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw 'Para regenerar el QR se necesita Node.js. La página publicada no necesita Node.js.'
}
$generador = Join-Path $PSScriptRoot 'generar-qr.cjs'
& node $generador $Url
if ($LASTEXITCODE -ne 0) { throw 'No se pudo generar el código QR.' }
