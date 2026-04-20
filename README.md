# Barrels and Buckets, GitHub Pages package

This folder is the clean static site package for GitHub Pages.

Included:
- homepage and all static site pages
- CSS and JS assets
- sanitized public inventory data

Not included:
- WordPress theme files
- internal workspace files
- private inventory or supplier data

## Fastest publish path

1. Create a new GitHub repo for this site
2. Upload the contents of this folder to that repo root
3. In GitHub, go to Settings → Pages
4. Set Source to `Deploy from a branch`
5. Choose branch `main` and folder `/ (root)`
6. Save

Your site will publish at:
- `https://YOUR-USERNAME.github.io/REPO-NAME/`
- or, if the repo is named `YOUR-USERNAME.github.io`, at `https://YOUR-USERNAME.github.io/`

## Notes

- Forms are still static right now, so contact submissions need a form backend later.
- Inventory updates are file-based right now. We can automate that next.
- If you want a custom domain, we can add that after the first publish.
