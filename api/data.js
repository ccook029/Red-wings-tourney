const SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSYYvchLq61YbJVSejZdSokjnWaTtjtfif9QUX2Qp6hM9wl_86r5P3TQ_maFRx9_upcGQcKanJ8auoh/pub?gid=1624470606&single=true&output=csv";

module.exports = async (req, res) => {
  try {
    const r = await fetch(SHEET, { redirect: "follow" });
    const text = await r.text();
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=30");
    res.status(r.ok ? 200 : 502).send(text);
  } catch (e) {
    res.status(502).send("Could not reach the tournament sheet");
  }
};
