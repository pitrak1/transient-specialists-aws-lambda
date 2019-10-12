exports.matchers = {
  toMatchWithoutWhitespace(received, expected) {
    const receivedFiltered = received.replace(/\s+/g, ' ')
    const expectedFiltered = expected.replace(/\s+/g, ' ')
    if (receivedFiltered == expectedFiltered) {
      return {
        message: () =>
          `expected ${receivedFiltered} not to match ${expectedFiltered}`,
        pass: true,
      }
    } else {
      return {
        message: () =>
          `expected ${receivedFiltered} to match ${expectedFiltered}`,
        pass: false,
      }
    }
  },
}
