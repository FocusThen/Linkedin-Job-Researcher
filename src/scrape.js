const fetch = require("node-fetch");
const cheerio = require("cheerio");

const baseUrl =
  "https://www.linkedin.com/jobs/jobs-in-fatih?trk=homepage-basic_intent-module-jobs&position=1&pageNum=0";

async function getData() {
  const url = baseUrl;

  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);

  const container = $(
    ".jobs-search__results-list > li > div.result-card__contents"
  );

  const jobs = [];

  for (let i = 0; i < container.length; i += 1) {
    const jobContainer = $(container[i]);
    const jobTitles = jobContainer.find("h3").text();
    const subTitle = jobContainer.find("h4 > a").text();
    const card = $(jobContainer.find(".result-card__meta"));
    const jobLocation = card.find("span:first-child").text();

    jobs.push({
      jobTitles,
      subTitle,
      jobLocation,
    });
  }

  console.log(jobs);

  return jobs;
}

module.exports = {
  getData,
};
