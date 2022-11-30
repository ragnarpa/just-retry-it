import retry from "../src/retry";

describe("retry", () => {
  it("retries failed operation", async () => {
    const op = jest
      .fn()
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValue("ok");

    const result = await retry(op, undefined, { retries: 2 });

    expect(op).toHaveBeenCalledTimes(2);
    expect(result).toEqual("ok");
  });

  it("calls error handling func on failure", async () => {
    const op = jest
      .fn()
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValue("ok");
    const errorHandler = jest.fn().mockImplementation(() => Promise.resolve());

    const result = await retry(op, errorHandler, { retries: 2 });

    expect(errorHandler).toHaveBeenCalledTimes(1);
  });
});
