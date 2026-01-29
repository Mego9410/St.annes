# St. Annes

Project for St. Annes (website and related materials).

## Project structure

| Folder | Contents |
|--------|----------|
| **st-annes-website/** | Main St. Annes website (React + Vite + TypeScript). Run with `npm run dev` from that folder. |
| **skills/** | Agent skills used for this repo (frontend-design, web-artifacts-builder, webapp-testing). |
| **reference/** | Reference HTML and legacy/archive files (e.g. life_Church_HTML, St.annes notes). |
| **.agents/** | Legacy location for skills; canonical copy is in **skills/**. |

## Quick start

1. **Website**
   ```bash
   cd st-annes-website
   npm install
   npm run dev
   ```

2. **Skills**  
   See the `skills/` folder for skill definitions (e.g. `SKILL.md` in each subfolder).

## Deploy to Vercel

1. Import the repo in [Vercel](https://vercel.com).
2. **Set Root Directory:** In the project, go to **Settings ? General ? Root Directory**, set it to **`st-annes-website`**, then save.
3. Redeploy (Deployments ? ? on latest ? Redeploy).

If Root Directory is left as the repo root, the site will 404 because the app and build live in `st-annes-website/`.

## License

See individual folders and files for any license or attribution notes.
