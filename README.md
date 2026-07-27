# The Archive

A little photo library — a shelf per year, a book per month.

## Adding your photos

1. Inside `photos/`, make a folder for each month you have pictures for, named `YYYY-MM`:
   ```
   photos/2026-07/
   photos/2024-12/
   ```
2. Drop your image files into those folders (jpg, jpeg, png, gif, webp, avif). Filenames
   don't matter — they're sorted alphabetically within the month.
3. Regenerate the manifest:
   ```
   node build-manifest.js
   ```
4. Commit and push. GitHub Pages picks up the changes automatically.

Months with no folder still show up on the shelf, just with placeholder colors instead
of real photos.

## Publishing (GitHub Pages)

Already set up — push to `main` and the site updates at your Pages URL within a minute
or two.
