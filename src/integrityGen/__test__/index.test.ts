import intergrityGen from "../index";

describe("check for intergrity", () => {
  it("match with bootstrap cdn by specifying css", async () => {
    const url =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    const res = await intergrityGen(url, "css");
    const match = `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">`;
    expect(res.html).toEqual(match);
  });

  it("match with bootstrap cdn without specifying css", async () => {
    const url =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    const res = await intergrityGen(url);
    const match = `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">`;
    expect(res.html).toEqual(match);
  });

  it("match with jquery cdn by specifying js", async () => {
    const url = "https://code.jquery.com/jquery-3.2.1.slim.min.js";
    const res = await intergrityGen(url, "js");
    const match = `<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>`;
    expect(res.html).toEqual(match);
  });

  it("match with jquery cdn without specifying js", async () => {
    const url = "https://code.jquery.com/jquery-3.2.1.slim.min.js";
    const res = await intergrityGen(url);
    const match = `<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>`;
    expect(res.html).toEqual(match);
  });
});
