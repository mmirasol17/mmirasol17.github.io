// Abstract capture config for the project-preview screenshot generator.
//
// Each entry is one page load; `shots` are frames captured from it. A shot
// either sits at the top of the page (`top: true`) or scrolls a section into
// view by a distinctive substring of its text, then nudges by `offset` px so
// the section clears the sticky navbar. `name` is the output file stem written
// to public/images/project-previews/<name>.webp (matches useProjects.tsx).
//
// To add a project: add an entry here and reference the <name>.webp files in
// its `previewImages` array. Re-run `npm run screenshots` (or the Action).

export const captures = [
  {
    project: "lifelyze",
    url: "https://lifelyze.com",
    shots: [
      { name: "lifelyze-1", top: true, wait: 1600 },
      { name: "lifelyze-2", text: "Tell MyAI what to do", margin: 120, wait: 2600 },
      { name: "lifelyze-3", text: "Lift, run, or hoop", margin: 110, wait: 1800 },
      { name: "lifelyze-4", text: "AI reads your data", margin: 110, wait: 1800 },
    ],
  },
  {
    project: "tunelyze",
    url: "https://tunelyze.com",
    shots: [
      { name: "tunelyze-1", top: true, wait: 1600 },
      { name: "tunelyze-2", text: "entire library, organized", margin: 90, wait: 1800 },
      { name: "tunelyze-3", text: "Deep music analytics", margin: 110, wait: 1800 },
      { name: "tunelyze-4", text: "Smart playlists, your way", margin: 110, wait: 1800 },
    ],
  },
  {
    project: "prouml",
    url: "https://prouml.com",
    shots: [{ name: "prouml-1", top: true, wait: 2200 }],
  },
  // ExchangeMyIdeas is only reachable from the CI runner (InfinityFree blocks
  // some hosts); local runs skip it gracefully.
  {
    project: "exchangemyideas",
    url: "https://exchangemyideas.marinmirasol.com/index.php",
    shots: [{ name: "exchangemyideas-1", top: true, wait: 1600 }],
  },
  {
    project: "exchangemyideas",
    url: "https://exchangemyideas.marinmirasol.com/create_blog.php",
    shots: [{ name: "exchangemyideas-2", top: true, wait: 1600 }],
  },
];
