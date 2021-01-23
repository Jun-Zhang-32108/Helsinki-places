const getOpenTime = require('../app').getOpenTime

describe('getOpenTime', () => {
  test('open_hours is null', () => {
    expect(getOpenTime(null, 1)).toBe('unknown')
  })

  const test_openHours = [
    {
      weekday_id: 1,
      opens: "10:00:00",
      closes: "20:00:00",
      open24h: false
    },
    {
      weekday_id: 2,
      opens: "10:00:00",
      closes: "20:00:00",
      open24h: false
    },
    {
      weekday_id: 3,
      opens: "10:00:00",
      closes: "20:00:00",
      open24h: false
    },
    {
      weekday_id: 4,
      opens: "10:00:00",
      closes: "20:00:00",
      open24h: false
    },
    {
      weekday_id: 5,
      opens: "10:00:00",
      closes: "20:00:00",
      open24h: false
    },
    {
      weekday_id: 6,
      opens: "10:00:00",
      closes: "18:00:00",
      open24h: false
    },
    {
      weekday_id: 7,
      opens: "12:00:00",
      closes: "18:00:00",
      open24h: false
    }
  ]; 

  test('open_hours is a list without null', () => {
    expect(getOpenTime(test_openHours, 6)).toBe("12:00:00 - 18:00:00");
  })

  test('open_hours is a list with null in one of the opens values', () => {
    let test_openHours_2 = JSON.parse(JSON.stringify(test_openHours));
    test_openHours_2[6].opens = null;
    expect(getOpenTime(test_openHours_2, 6)).toBe("null - 18:00:00");
  })

  test('open_hours is a list with null in opens value and close value in one day', () => {
    let test_openHours_3 = JSON.parse(JSON.stringify(test_openHours));
    test_openHours_3[6].opens = null;
    test_openHours_3[6].closes = null;
    expect(getOpenTime(test_openHours_3, 6)).toMatch("unknown")
  })
})