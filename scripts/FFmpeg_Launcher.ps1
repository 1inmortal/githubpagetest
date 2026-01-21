# FFmpeg Launcher - Aplicación PowerShell
# Autor: Asistente IA
# Versión: 1.0

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Configuración de la ventana
$form = New-Object System.Windows.Forms.Form
$form.Text = "FFmpeg Launcher v1.0"
$form.Size = New-Object System.Drawing.Size(500, 400)
$form.StartPosition = "CenterScreen"
$form.FormBorderStyle = "FixedDialog"
$form.MaximizeBox = $false

# Función para verificar FFmpeg
function Test-FFmpeg {
    try {
        $null = Get-Command ffmpeg -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

# Función para ejecutar FFmpeg
function Invoke-FFmpeg {
    param(
        [string]$Arguments,
        [string]$InputFile,
        [string]$OutputFile
    )
    
    $process = Start-Process -FilePath "ffmpeg" -ArgumentList $Arguments -PassThru -Wait -NoNewWindow
    return $process.ExitCode
}

# Crear controles
$labelTitle = New-Object System.Windows.Forms.Label
$labelTitle.Text = "FFmpeg Launcher"
$labelTitle.Font = New-Object System.Drawing.Font("Arial", 16, [System.Drawing.FontStyle]::Bold)
$labelTitle.Location = New-Object System.Drawing.Point(150, 20)
$labelTitle.Size = New-Object System.Drawing.Size(200, 30)

$btnOptimizeHigh = New-Object System.Windows.Forms.Button
$btnOptimizeHigh.Text = "Optimizar Video (Alta Calidad)"
$btnOptimizeHigh.Location = New-Object System.Drawing.Point(50, 70)
$btnOptimizeHigh.Size = New-Object System.Drawing.Size(200, 30)

$btnOptimizeMedium = New-Object System.Windows.Forms.Button
$btnOptimizeMedium.Text = "Optimizar Video (Media Calidad)"
$btnOptimizeMedium.Location = New-Object System.Drawing.Point(250, 70)
$btnOptimizeMedium.Size = New-Object System.Drawing.Size(200, 30)

$btnOptimizeLow = New-Object System.Windows.Forms.Button
$btnOptimizeLow.Text = "Optimizar Video (Baja Calidad)"
$btnOptimizeLow.Location = New-Object System.Drawing.Point(50, 110)
$btnOptimizeLow.Size = New-Object System.Drawing.Size(200, 30)

$btnConvert = New-Object System.Windows.Forms.Button
$btnConvert.Text = "Convertir a MP4"
$btnConvert.Location = New-Object System.Drawing.Point(250, 110)
$btnConvert.Size = New-Object System.Drawing.Size(200, 30)

$btnExtractAudio = New-Object System.Windows.Forms.Button
$btnExtractAudio.Text = "Extraer Audio"
$btnExtractAudio.Location = New-Object System.Drawing.Point(50, 150)
$btnExtractAudio.Size = New-Object System.Drawing.Size(200, 30)

$btnResize = New-Object System.Windows.Forms.Button
$btnResize.Text = "Redimensionar Video"
$btnResize.Location = New-Object System.Drawing.Point(250, 150)
$btnResize.Size = New-Object System.Drawing.Size(200, 30)

$btnInfo = New-Object System.Windows.Forms.Button
$btnInfo.Text = "Información del Video"
$btnInfo.Location = New-Object System.Drawing.Point(50, 190)
$btnInfo.Size = New-Object System.Drawing.Size(200, 30)

$btnExit = New-Object System.Windows.Forms.Button
$btnExit.Text = "Salir"
$btnExit.Location = New-Object System.Drawing.Point(250, 190)
$btnExit.Size = New-Object System.Drawing.Size(200, 30)

$statusLabel = New-Object System.Windows.Forms.Label
$statusLabel.Text = "Listo"
$statusLabel.Location = New-Object System.Drawing.Point(50, 250)
$statusLabel.Size = New-Object System.Drawing.Size(400, 20)

# Eventos de los botones
$btnOptimizeHigh.Add_Click({
    $inputFile = [System.Windows.Forms.OpenFileDialog]::new()
    $inputFile.Filter = "Archivos de video|*.mp4;*.avi;*.mov;*.mkv;*.wmv"
    if ($inputFile.ShowDialog() -eq "OK") {
        $outputFile = [System.Windows.Forms.SaveFileDialog]::new()
        $outputFile.Filter = "Archivos MP4|*.mp4"
        $outputFile.FileName = [System.IO.Path]::GetFileNameWithoutExtension($inputFile.FileName) + "_optimized.mp4"
        if ($outputFile.ShowDialog() -eq "OK") {
            $statusLabel.Text = "Optimizando video (Alta Calidad)..."
            $args = "-i `"$($inputFile.FileName)`" -vcodec libx264 -crf 23 -preset medium -acodec aac -b:a 128k `"$($outputFile.FileName)`""
            $result = Invoke-FFmpeg -Arguments $args
            if ($result -eq 0) {
                $statusLabel.Text = "Optimización completada exitosamente!"
                [System.Windows.Forms.MessageBox]::Show("Video optimizado correctamente!", "Éxito")
            } else {
                $statusLabel.Text = "Error en la optimización"
                [System.Windows.Forms.MessageBox]::Show("Error al optimizar el video", "Error")
            }
        }
    }
})

$btnOptimizeMedium.Add_Click({
    $inputFile = [System.Windows.Forms.OpenFileDialog]::new()
    $inputFile.Filter = "Archivos de video|*.mp4;*.avi;*.mov;*.mkv;*.wmv"
    if ($inputFile.ShowDialog() -eq "OK") {
        $outputFile = [System.Windows.Forms.SaveFileDialog]::new()
        $outputFile.Filter = "Archivos MP4|*.mp4"
        $outputFile.FileName = [System.IO.Path]::GetFileNameWithoutExtension($inputFile.FileName) + "_optimized.mp4"
        if ($outputFile.ShowDialog() -eq "OK") {
            $statusLabel.Text = "Optimizando video (Media Calidad)..."
            $args = "-i `"$($inputFile.FileName)`" -vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 96k `"$($outputFile.FileName)`""
            $result = Invoke-FFmpeg -Arguments $args
            if ($result -eq 0) {
                $statusLabel.Text = "Optimización completada exitosamente!"
                [System.Windows.Forms.MessageBox]::Show("Video optimizado correctamente!", "Éxito")
            } else {
                $statusLabel.Text = "Error en la optimización"
                [System.Windows.Forms.MessageBox]::Show("Error al optimizar el video", "Error")
            }
        }
    }
})

$btnOptimizeLow.Add_Click({
    $inputFile = [System.Windows.Forms.OpenFileDialog]::new()
    $inputFile.Filter = "Archivos de video|*.mp4;*.avi;*.mov;*.mkv;*.wmv"
    if ($inputFile.ShowDialog() -eq "OK") {
        $outputFile = [System.Windows.Forms.SaveFileDialog]::new()
        $outputFile.Filter = "Archivos MP4|*.mp4"
        $outputFile.FileName = [System.IO.Path]::GetFileNameWithoutExtension($inputFile.FileName) + "_optimized.mp4"
        if ($outputFile.ShowDialog() -eq "OK") {
            $statusLabel.Text = "Optimizando video (Baja Calidad)..."
            $args = "-i `"$($inputFile.FileName)`" -vcodec libx264 -crf 35 -preset fast -acodec aac -b:a 64k `"$($outputFile.FileName)`""
            $result = Invoke-FFmpeg -Arguments $args
            if ($result -eq 0) {
                $statusLabel.Text = "Optimización completada exitosamente!"
                [System.Windows.Forms.MessageBox]::Show("Video optimizado correctamente!", "Éxito")
            } else {
                $statusLabel.Text = "Error en la optimización"
                [System.Windows.Forms.MessageBox]::Show("Error al optimizar el video", "Error")
            }
        }
    }
})

$btnConvert.Add_Click({
    $inputFile = [System.Windows.Forms.OpenFileDialog]::new()
    $inputFile.Filter = "Archivos de video|*.mp4;*.avi;*.mov;*.mkv;*.wmv"
    if ($inputFile.ShowDialog() -eq "OK") {
        $outputFile = [System.Windows.Forms.SaveFileDialog]::new()
        $outputFile.Filter = "Archivos MP4|*.mp4"
        $outputFile.FileName = [System.IO.Path]::GetFileNameWithoutExtension($inputFile.FileName) + ".mp4"
        if ($outputFile.ShowDialog() -eq "OK") {
            $statusLabel.Text = "Convirtiendo video..."
            $args = "-i `"$($inputFile.FileName)`" -c copy `"$($outputFile.FileName)`""
            $result = Invoke-FFmpeg -Arguments $args
            if ($result -eq 0) {
                $statusLabel.Text = "Conversión completada exitosamente!"
                [System.Windows.Forms.MessageBox]::Show("Video convertido correctamente!", "Éxito")
            } else {
                $statusLabel.Text = "Error en la conversión"
                [System.Windows.Forms.MessageBox]::Show("Error al convertir el video", "Error")
            }
        }
    }
})

$btnExtractAudio.Add_Click({
    $inputFile = [System.Windows.Forms.OpenFileDialog]::new()
    $inputFile.Filter = "Archivos de video|*.mp4;*.avi;*.mov;*.mkv;*.wmv"
    if ($inputFile.ShowDialog() -eq "OK") {
        $outputFile = [System.Windows.Forms.SaveFileDialog]::new()
        $outputFile.Filter = "Archivos MP3|*.mp3"
        $outputFile.FileName = [System.IO.Path]::GetFileNameWithoutExtension($inputFile.FileName) + ".mp3"
        if ($outputFile.ShowDialog() -eq "OK") {
            $statusLabel.Text = "Extrayendo audio..."
            $args = "-i `"$($inputFile.FileName)`" -vn -acodec mp3 -ab 128k `"$($outputFile.FileName)`""
            $result = Invoke-FFmpeg -Arguments $args
            if ($result -eq 0) {
                $statusLabel.Text = "Extracción completada exitosamente!"
                [System.Windows.Forms.MessageBox]::Show("Audio extraído correctamente!", "Éxito")
            } else {
                $statusLabel.Text = "Error en la extracción"
                [System.Windows.Forms.MessageBox]::Show("Error al extraer el audio", "Error")
            }
        }
    }
})

$btnResize.Add_Click({
    $inputFile = [System.Windows.Forms.OpenFileDialog]::new()
    $inputFile.Filter = "Archivos de video|*.mp4;*.avi;*.mov;*.mkv;*.wmv"
    if ($inputFile.ShowDialog() -eq "OK") {
        $formResize = New-Object System.Windows.Forms.Form
        $formResize.Text = "Redimensionar Video"
        $formResize.Size = New-Object System.Drawing.Size(300, 200)
        $formResize.StartPosition = "CenterParent"
        
        $labelResize = New-Object System.Windows.Forms.Label
        $labelResize.Text = "Selecciona la resolución:"
        $labelResize.Location = New-Object System.Drawing.Point(20, 20)
        $labelResize.Size = New-Object System.Drawing.Size(200, 20)
        
        $comboResize = New-Object System.Windows.Forms.ComboBox
        $comboResize.Items.AddRange(@("1920x1080 (Full HD)", "1280x720 (HD)", "854x480 (480p)", "640x360 (360p)"))
        $comboResize.SelectedIndex = 0
        $comboResize.Location = New-Object System.Drawing.Point(20, 50)
        $comboResize.Size = New-Object System.Drawing.Size(200, 20)
        
        $btnResizeOK = New-Object System.Windows.Forms.Button
        $btnResizeOK.Text = "Aceptar"
        $btnResizeOK.Location = New-Object System.Drawing.Point(50, 100)
        $btnResizeOK.Size = New-Object System.Drawing.Size(80, 30)
        
        $btnResizeCancel = New-Object System.Windows.Forms.Button
        $btnResizeCancel.Text = "Cancelar"
        $btnResizeCancel.Location = New-Object System.Windows.Forms.Point(150, 100)
        $btnResizeCancel.Size = New-Object System.Drawing.Size(80, 30)
        
        $btnResizeOK.Add_Click({
            $resolutions = @("1920:1080", "1280:720", "854:480", "640:360")
            $selectedResolution = $resolutions[$comboResize.SelectedIndex]
            
            $outputFile = [System.Windows.Forms.SaveFileDialog]::new()
            $outputFile.Filter = "Archivos MP4|*.mp4"
            $outputFile.FileName = [System.IO.Path]::GetFileNameWithoutExtension($inputFile.FileName) + "_resized.mp4"
            if ($outputFile.ShowDialog() -eq "OK") {
                $formResize.Close()
                $statusLabel.Text = "Redimensionando video..."
                $args = "-i `"$($inputFile.FileName)`" -vf scale=$selectedResolution -c:a copy `"$($outputFile.FileName)`""
                $result = Invoke-FFmpeg -Arguments $args
                if ($result -eq 0) {
                    $statusLabel.Text = "Redimensionamiento completado exitosamente!"
                    [System.Windows.Forms.MessageBox]::Show("Video redimensionado correctamente!", "Éxito")
                } else {
                    $statusLabel.Text = "Error en el redimensionamiento"
                    [System.Windows.Forms.MessageBox]::Show("Error al redimensionar el video", "Error")
                }
            }
        })
        
        $btnResizeCancel.Add_Click({
            $formResize.Close()
        })
        
        $formResize.Controls.Add($labelResize)
        $formResize.Controls.Add($comboResize)
        $formResize.Controls.Add($btnResizeOK)
        $formResize.Controls.Add($btnResizeCancel)
        $formResize.ShowDialog()
    }
})

$btnInfo.Add_Click({
    $inputFile = [System.Windows.Forms.OpenFileDialog]::new()
    $inputFile.Filter = "Archivos de video|*.mp4;*.avi;*.mov;*.mkv;*.wmv"
    if ($inputFile.ShowDialog() -eq "OK") {
        $statusLabel.Text = "Obteniendo información del video..."
        $info = & ffmpeg -i $inputFile.FileName 2>&1 | Select-String "Duration|Stream"
        $formInfo = New-Object System.Windows.Forms.Form
        $formInfo.Text = "Información del Video"
        $formInfo.Size = New-Object System.Drawing.Size(600, 400)
        $formInfo.StartPosition = "CenterParent"
        
        $textInfo = New-Object System.Windows.Forms.TextBox
        $textInfo.Multiline = $true
        $textInfo.ScrollBars = "Vertical"
        $textInfo.Text = $info -join "`n"
        $textInfo.Location = New-Object System.Drawing.Point(10, 10)
        $textInfo.Size = New-Object System.Drawing.Size(570, 350)
        $textInfo.ReadOnly = $true
        
        $formInfo.Controls.Add($textInfo)
        $formInfo.ShowDialog()
        $statusLabel.Text = "Información obtenida"
    }
})

$btnExit.Add_Click({
    $form.Close()
})

# Verificar FFmpeg al cargar
if (-not (Test-FFmpeg)) {
    [System.Windows.Forms.MessageBox]::Show("FFmpeg no está instalado o no está en el PATH del sistema.`n`nPor favor instala FFmpeg y agrégalo al PATH antes de usar esta aplicación.", "Error", "OK", "Error")
    $form.Close()
    exit
}

# Agregar controles al formulario
$form.Controls.Add($labelTitle)
$form.Controls.Add($btnOptimizeHigh)
$form.Controls.Add($btnOptimizeMedium)
$form.Controls.Add($btnOptimizeLow)
$form.Controls.Add($btnConvert)
$form.Controls.Add($btnExtractAudio)
$form.Controls.Add($btnResize)
$form.Controls.Add($btnInfo)
$form.Controls.Add($btnExit)
$form.Controls.Add($statusLabel)

# Mostrar formulario
$form.ShowDialog()
