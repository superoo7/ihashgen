import intergrityGen from "../index";

describe("check for intergrity", () => {
  it("match with bootstrap cdn", async () => {
    const url =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    const res = await intergrityGen(url);
    const match =
      "Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm";
    expect(res).toEqual(match);
  });
});
