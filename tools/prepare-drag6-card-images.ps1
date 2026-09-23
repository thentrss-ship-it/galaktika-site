$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = (Get-Location).Path
$outputDir = Join-Path $root "public/products/voopoo"
$tempDir = Join-Path $root "work/drag6-source"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public static class Drag6ImageProcessor
{
    public static void Process(string sourcePath, string destinationPath)
    {
        using (var source = (Bitmap)Image.FromFile(sourcePath))
        {
            var bounds = GetProductBounds(source);
            using (var crop = source.Clone(bounds, PixelFormat.Format32bppArgb))
            using (var canvas = new Bitmap(1000, 1000, PixelFormat.Format32bppArgb))
            {
                RemoveEdgeBackground(crop);

                using (var graphics = Graphics.FromImage(canvas))
                {
                    graphics.Clear(Color.Transparent);
                    graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    graphics.SmoothingMode = SmoothingMode.HighQuality;
                    graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                    double scale = Math.Min(620.0 / crop.Width, 880.0 / crop.Height);
                    int drawWidth = (int)Math.Floor(crop.Width * scale);
                    int drawHeight = (int)Math.Floor(crop.Height * scale);
                    int drawX = (1000 - drawWidth) / 2;
                    int drawY = (1000 - drawHeight) / 2;

                    graphics.DrawImage(crop, drawX, drawY, drawWidth, drawHeight);
                }

                canvas.Save(destinationPath, ImageFormat.Png);
            }
        }
    }

    private static Rectangle GetProductBounds(Bitmap bitmap)
    {
        int startX = (int)Math.Floor(bitmap.Width * 0.64);
        int minX = bitmap.Width;
        int minY = bitmap.Height;
        int maxX = 0;
        int maxY = 0;

        for (int y = 0; y < bitmap.Height; y++)
        {
            for (int x = startX; x < bitmap.Width; x++)
            {
                Color pixel = bitmap.GetPixel(x, y);
                bool isWhite = pixel.R > 244 && pixel.G > 244 && pixel.B > 244;

                if (!isWhite)
                {
                    minX = Math.Min(minX, x);
                    maxX = Math.Max(maxX, x);
                    minY = Math.Min(minY, y);
                    maxY = Math.Max(maxY, y);
                }
            }
        }

        if (maxX <= minX || maxY <= minY)
        {
            throw new InvalidOperationException("Could not find product bounds");
        }

        int padX = (int)Math.Floor((maxX - minX) * 0.08);
        int padY = (int)Math.Floor((maxY - minY) * 0.06);
        int left = Math.Max(startX, minX - padX);
        int top = Math.Max(0, minY - padY);
        int right = Math.Min(bitmap.Width - 1, maxX + padX);
        int bottom = Math.Min(bitmap.Height - 1, maxY + padY);

        return new Rectangle(left, top, right - left + 1, bottom - top + 1);
    }

    private static bool IsBackgroundPixel(Color pixel)
    {
        int max = Math.Max(pixel.R, Math.Max(pixel.G, pixel.B));
        int min = Math.Min(pixel.R, Math.Min(pixel.G, pixel.B));

        return pixel.R > 232 && pixel.G > 232 && pixel.B > 232 && (max - min) < 18;
    }

    private static void AddPoint(Bitmap bitmap, bool[] visited, Queue<int> queue, int x, int y)
    {
        if (x < 0 || y < 0 || x >= bitmap.Width || y >= bitmap.Height)
        {
            return;
        }

        int index = (y * bitmap.Width) + x;
        if (visited[index])
        {
            return;
        }

        visited[index] = true;
        if (IsBackgroundPixel(bitmap.GetPixel(x, y)))
        {
            queue.Enqueue(index);
        }
    }

    private static void RemoveEdgeBackground(Bitmap bitmap)
    {
        bool[] visited = new bool[bitmap.Width * bitmap.Height];
        var queue = new Queue<int>();

        for (int x = 0; x < bitmap.Width; x++)
        {
            AddPoint(bitmap, visited, queue, x, 0);
            AddPoint(bitmap, visited, queue, x, bitmap.Height - 1);
        }

        for (int y = 0; y < bitmap.Height; y++)
        {
            AddPoint(bitmap, visited, queue, 0, y);
            AddPoint(bitmap, visited, queue, bitmap.Width - 1, y);
        }

        while (queue.Count > 0)
        {
            int index = queue.Dequeue();
            int x = index % bitmap.Width;
            int y = index / bitmap.Width;
            Color pixel = bitmap.GetPixel(x, y);

            bitmap.SetPixel(x, y, Color.FromArgb(0, pixel.R, pixel.G, pixel.B));

            AddPoint(bitmap, visited, queue, x + 1, y);
            AddPoint(bitmap, visited, queue, x - 1, y);
            AddPoint(bitmap, visited, queue, x, y + 1);
            AddPoint(bitmap, visited, queue, x, y - 1);
        }
    }
}
"@

$items = @(
  @{
    Slug = "voopoo-nabor-voopoo-drag-6-kit-black"
    Url = "https://img-va.myshopline.com/image/store/1747294110724/263608e0678645f2a02b4f71e798c65c.jpg?h=3636&w=3377"
  },
  @{
    Slug = "voopoo-nabor-voopoo-drag-6-kit-blue"
    Url = "https://img-va.myshopline.com/image/store/1747294110724/--28.jpg?h=3636&w=3377"
  },
  @{
    Slug = "voopoo-nabor-voopoo-drag-6-kit-brown"
    Url = "https://img-va.myshopline.com/image/store/1747294110724/--34.jpg?h=3636&w=3377"
  },
  @{
    Slug = "voopoo-nabor-voopoo-drag-6-kit-metal-gray"
    Url = "https://img-va.myshopline.com/image/store/1747294110724/--35.jpg?h=3636&w=3377"
  },
  @{
    Slug = "voopoo-nabor-voopoo-drag-6-kit-silver"
    Url = "https://img-va.myshopline.com/image/store/1747294110724/--36.jpg?h=3636&w=3377"
  },
  @{
    Slug = "voopoo-nabor-voopoo-drag-6-kit-green"
    Url = "https://img-va.myshopline.com/image/store/1747294110724/7864858541e140c988522592ca85207a.jpg?h=3636&w=3377"
  },
  @{
    Slug = "voopoo-nabor-voopoo-drag-6-kit-red"
    Url = "https://img-va.myshopline.com/image/store/1747294110724/--33.jpg?h=3636&w=3377"
  }
)

foreach ($item in $items) {
  $sourcePath = Join-Path $tempDir "$($item.Slug).jpg"
  if (-not (Test-Path -LiteralPath $sourcePath)) {
    throw "Missing source image: $sourcePath"
  }

  $destination = Join-Path $outputDir "$($item.Slug).png"
  [Drag6ImageProcessor]::Process($sourcePath, $destination)

  Write-Host "$($item.Slug).png"
}
