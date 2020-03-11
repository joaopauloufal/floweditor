const functions = [
  {
    signature: 'abs(number)',
    summary: 'Returns the absolute value of `number`.',
    detail: '',
    examples: [
      {
        template: '@(abs(-10))',
        output: '10'
      },
      {
        template: '@(abs(10.5))',
        output: '10.5'
      },
      {
        template: '@(abs("foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'and(values...)',
    summary: 'Returns whether all the given `values` are truthy.',
    detail: '',
    examples: [
      {
        template: '@(and(true))',
        output: 'true'
      },
      {
        template: '@(and(true, false, true))',
        output: 'false'
      }
    ]
  },
  {
    signature: 'array(values...)',
    summary: 'Takes multiple `values` and returns them as an array.',
    detail: '',
    examples: [
      {
        template: '@(array("a", "b", 356)[1])',
        output: 'b'
      },
      {
        template: '@(join(array("a", "b", "c"), "|"))',
        output: 'a|b|c'
      },
      {
        template: '@(count(array()))',
        output: '0'
      },
      {
        template: '@(count(array("a", "b")))',
        output: '2'
      }
    ]
  },
  {
    signature: 'attachment_parts(attachment)',
    summary: 'Parses an attachment into its different parts',
    detail: '',
    examples: [
      {
        template: '@(attachment_parts("image/jpeg:https://example.com/test.jpg"))',
        output: '{content_type: image/jpeg, url: https://example.com/test.jpg}'
      }
    ]
  },
  {
    signature: 'boolean(value)',
    summary: 'Tries to convert `value` to a boolean.',
    detail: "An error is returned if the value can't be converted.",
    examples: [
      {
        template: '@(boolean(array(1, 2)))',
        output: 'true'
      },
      {
        template: '@(boolean("FALSE"))',
        output: 'false'
      },
      {
        template: '@(boolean(1 / 0))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'char(code)',
    summary: 'Returns the character for the given UNICODE `code`.',
    detail: 'It is the inverse of [function:code].',
    examples: [
      {
        template: '@(char(33))',
        output: '!'
      },
      {
        template: '@(char(128512))',
        output: '😀'
      },
      {
        template: '@(char("foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'clean(text)',
    summary: 'Removes any non-printable characters from `text`.',
    detail: '',
    examples: [
      {
        template: '@(clean("😃 Hello \\nwo\\tr\\rld"))',
        output: '😃 Hello world'
      },
      {
        template: '@(clean(123))',
        output: '123'
      }
    ]
  },
  {
    signature: 'code(text)',
    summary: 'Returns the UNICODE code for the first character of `text`.',
    detail: 'It is the inverse of [function:char].',
    examples: [
      {
        template: '@(code("a"))',
        output: '97'
      },
      {
        template: '@(code("abc"))',
        output: '97'
      },
      {
        template: '@(code("😀"))',
        output: '128512'
      },
      {
        template: '@(code("15"))',
        output: '49'
      },
      {
        template: '@(code(15))',
        output: '49'
      },
      {
        template: '@(code(""))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'count(value)',
    summary: 'Returns the number of items in the given array or properties on an object.',
    detail: "It will return an error if it is passed an item which isn't countable.",
    examples: [
      {
        template: '@(count(contact.fields))',
        output: '5'
      },
      {
        template: '@(count(array()))',
        output: '0'
      },
      {
        template: '@(count(array("a", "b", "c")))',
        output: '3'
      },
      {
        template: '@(count(1234))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'date(value)',
    summary: 'Tries to convert `value` to a date.',
    detail:
      "If it is text then it will be parsed into a date using the default date format.\nAn error is returned if the value can't be converted.",
    examples: [
      {
        template: '@(date("1979-07-18"))',
        output: '1979-07-18'
      },
      {
        template: '@(date("1979-07-18T10:30:45.123456Z"))',
        output: '1979-07-18'
      },
      {
        template: '@(date("10/05/2010"))',
        output: '2010-05-10'
      },
      {
        template: '@(date("NOT DATE"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'date_from_parts(year, month, day)',
    summary: 'Creates a date from `year`, `month` and `day`.',
    detail: '',
    examples: [
      {
        template: '@(date_from_parts(2017, 1, 15))',
        output: '2017-01-15'
      },
      {
        template: '@(date_from_parts(2017, 2, 31))',
        output: '2017-03-03'
      },
      {
        template: '@(date_from_parts(2017, 13, 15))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'datetime(value)',
    summary: 'Tries to convert `value` to a datetime.',
    detail:
      "If it is text then it will be parsed into a datetime using the default date\nand time formats. An error is returned if the value can't be converted.",
    examples: [
      {
        template: '@(datetime("1979-07-18"))',
        output: '1979-07-18T00:00:00.000000-05:00'
      },
      {
        template: '@(datetime("1979-07-18T10:30:45.123456Z"))',
        output: '1979-07-18T10:30:45.123456Z'
      },
      {
        template: '@(datetime("10/05/2010"))',
        output: '2010-05-10T00:00:00.000000-05:00'
      },
      {
        template: '@(datetime("NOT DATE"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'datetime_add(datetime, offset, unit)',
    summary:
      'Calculates the date value arrived at by adding `offset` number of `unit` to the `datetime`',
    detail:
      'Valid durations are "Y" for years, "M" for months, "W" for weeks, "D" for days, "h" for hour,\n"m" for minutes, "s" for seconds',
    examples: [
      {
        template: '@(datetime_add("2017-01-15", 5, "D"))',
        output: '2017-01-20T00:00:00.000000-05:00'
      },
      {
        template: '@(datetime_add("2017-01-15 10:45", 30, "m"))',
        output: '2017-01-15T11:15:00.000000-05:00'
      }
    ]
  },
  {
    signature: 'datetime_diff(date1, date2, unit)',
    summary: 'Returns the duration between `date1` and `date2` in the `unit` specified.',
    detail:
      'Valid durations are "Y" for years, "M" for months, "W" for weeks, "D" for days, "h" for hour,\n"m" for minutes, "s" for seconds.',
    examples: [
      {
        template: '@(datetime_diff("2017-01-15", "2017-01-17", "D"))',
        output: '2'
      },
      {
        template: '@(datetime_diff("2017-01-15", "2017-05-15", "W"))',
        output: '17'
      },
      {
        template: '@(datetime_diff("2017-01-15", "2017-05-15", "M"))',
        output: '4'
      },
      {
        template: '@(datetime_diff("2017-01-17 10:50", "2017-01-17 12:30", "h"))',
        output: '1'
      },
      {
        template: '@(datetime_diff("2017-01-17", "2015-12-17", "Y"))',
        output: '-2'
      }
    ]
  },
  {
    signature: 'datetime_from_epoch(seconds)',
    summary: 'Converts the UNIX epoch time `seconds` into a new date.',
    detail: '',
    examples: [
      {
        template: '@(datetime_from_epoch(1497286619))',
        output: '2017-06-12T11:56:59.000000-05:00'
      },
      {
        template: '@(datetime_from_epoch(1497286619.123456))',
        output: '2017-06-12T11:56:59.123456-05:00'
      }
    ]
  },
  {
    signature: 'default(value, default)',
    summary: 'Returns `value` if is not empty or an error, otherwise it returns `default`.',
    detail: '',
    examples: [
      {
        template: '@(default(undeclared.var, "default_value"))',
        output: 'default_value'
      },
      {
        template: '@(default("10", "20"))',
        output: '10'
      },
      {
        template: '@(default("", "value"))',
        output: 'value'
      },
      {
        template: '@(default(array(1, 2), "value"))',
        output: '[1, 2]'
      },
      {
        template: '@(default(array(), "value"))',
        output: 'value'
      },
      {
        template: '@(default(datetime("invalid-date"), "today"))',
        output: 'today'
      },
      {
        template: '@(default(format_urn("invalid-urn"), "ok"))',
        output: 'ok'
      }
    ]
  },
  {
    signature: 'epoch(date)',
    summary: 'Converts `date` to a UNIX epoch time.',
    detail: 'The returned number can contain fractional seconds.',
    examples: [
      {
        template: '@(epoch("2017-06-12T16:56:59.000000Z"))',
        output: '1497286619'
      },
      {
        template: '@(epoch("2017-06-12T18:56:59.000000+02:00"))',
        output: '1497286619'
      },
      {
        template: '@(epoch("2017-06-12T16:56:59.123456Z"))',
        output: '1497286619.123456'
      },
      {
        template: '@(round_down(epoch("2017-06-12T16:56:59.123456Z")))',
        output: '1497286619'
      }
    ]
  },
  {
    signature: 'extract(object, properties)',
    summary: 'Takes an object and extracts the named property.',
    detail: '',
    examples: [
      {
        template: '@(extract(contact, "name"))',
        output: 'Ryan Lewis'
      },
      {
        template: '@(extract(contact.groups[0], "name"))',
        output: 'Testers'
      }
    ]
  },
  {
    signature: 'extract_object(object, properties...)',
    summary: 'Takes an object and returns a new object by extracting only the named properties.',
    detail: '',
    examples: [
      {
        template: '@(extract_object(contact.groups[0], "name"))',
        output: '{name: Testers}'
      }
    ]
  },
  {
    signature: 'field(text, index, delimiter)',
    summary: 'Splits `text` using the given `delimiter` and returns the field at `index`.',
    detail:
      'The index starts at zero. When splitting with a space, the delimiter is considered to be all whitespace.',
    examples: [
      {
        template: '@(field("a,b,c", 1, ","))',
        output: 'b'
      },
      {
        template: '@(field("a,,b,c", 1, ","))',
        output: ''
      },
      {
        template: '@(field("a   b c", 1, " "))',
        output: 'b'
      },
      {
        template: '@(field("a\t\tb\tc\td", 1, "\t"))',
        output: ''
      },
      {
        template: '@(field("a\\t\\tb\\tc\\td", 1, " "))',
        output: ''
      },
      {
        template: '@(field("a,b,c", "foo", ","))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'foreach(values, func, [args...])',
    summary: 'Creates a new array by applying `func` to each value in `values`.',
    detail:
      'If the given function takes more than one argument, you can pass additional arguments after the function.',
    examples: [
      {
        template: '@(foreach(array("a", "b", "c"), upper))',
        output: '[A, B, C]'
      },
      {
        template: '@(foreach(array("the man", "fox", "jumped up"), word, 0))',
        output: '[the, fox, jumped]'
      }
    ]
  },
  {
    signature: 'format(value)',
    summary: 'Formats `value` according to its type.',
    detail: '',
    examples: [
      {
        template: '@(format(1234.5670))',
        output: '1,234.567'
      },
      {
        template: '@(format(now()))',
        output: '11-04-2018 13:24'
      },
      {
        template: '@(format(today()))',
        output: '11-04-2018'
      }
    ]
  },
  {
    signature: 'format_date(date, [,format])',
    summary: 'Formats `date` as text according to the given `format`.',
    detail:
      "If `format` is not specified then the environment's default format is used. The format\nstring can consist of the following characters. The characters ' ', ':', ',', 'T', '-'\nand '_' are ignored. Any other character is an error.\n\n* `YY`        - last two digits of year 0-99\n* `YYYY`      - four digits of year 0000-9999\n* `M`         - month 1-12\n* `MM`        - month 01-12\n* `D`         - day of month, 1-31\n* `DD`        - day of month, zero padded 0-31",
    examples: [
      {
        template: '@(format_date("1979-07-18T15:00:00.000000Z"))',
        output: '18-07-1979'
      },
      {
        template: '@(format_date("1979-07-18T15:00:00.000000Z", "YYYY-MM-DD"))',
        output: '1979-07-18'
      },
      {
        template: '@(format_date("2010-05-10T19:50:00.000000Z", "YYYY M DD"))',
        output: '2010 5 10'
      },
      {
        template: '@(format_date("1979-07-18T15:00:00.000000Z", "YYYY"))',
        output: '1979'
      },
      {
        template: '@(format_date("1979-07-18T15:00:00.000000Z", "M"))',
        output: '7'
      },
      {
        template: '@(format_date("NOT DATE", "YYYY-MM-DD"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'format_datetime(datetime [,format [,timezone]])',
    summary: 'Formats `datetime` as text according to the given `format`.',
    detail:
      "If `format` is not specified then the environment's default format is used. The format\nstring can consist of the following characters. The characters ' ', ':', ',', 'T', '-'\nand '_' are ignored. Any other character is an error.\n\n* `YY`        - last two digits of year 0-99\n* `YYYY`      - four digits of year 0000-9999\n* `M`         - month 1-12\n* `MM`        - month 01-12\n* `D`         - day of month, 1-31\n* `DD`        - day of month, zero padded 0-31\n* `h`         - hour of the day 1-12\n* `hh`        - hour of the day 01-12\n* `tt`        - twenty four hour of the day 01-23\n* `m`         - minute 0-59\n* `mm`        - minute 00-59\n* `s`         - second 0-59\n* `ss`        - second 00-59\n* `fff`       - milliseconds\n* `ffffff`    - microseconds\n* `fffffffff` - nanoseconds\n* `aa`        - am or pm\n* `AA`        - AM or PM\n* `Z`         - hour and minute offset from UTC, or Z for UTC\n* `ZZZ`       - hour and minute offset from UTC\n\nTimezone should be a location name as specified in the IANA Time Zone database, such\nas \"America/Guayaquil\" or \"America/Los_Angeles\". If not specified, the current timezone\nwill be used. An error will be returned if the timezone is not recognized.",
    examples: [
      {
        template: '@(format_datetime("1979-07-18T15:00:00.000000Z"))',
        output: '18-07-1979 10:00'
      },
      {
        template: '@(format_datetime("1979-07-18T15:00:00.000000Z", "YYYY-MM-DD"))',
        output: '1979-07-18'
      },
      {
        template: '@(format_datetime("2010-05-10T19:50:00.000000Z", "YYYY M DD tt:mm"))',
        output: '2010 5 10 14:50'
      },
      {
        template:
          '@(format_datetime("2010-05-10T19:50:00.000000Z", "YYYY-MM-DD tt:mm AA", "America/Los_Angeles"))',
        output: '2010-05-10 12:50 PM'
      },
      {
        template: '@(format_datetime("1979-07-18T15:00:00.000000Z", "YYYY"))',
        output: '1979'
      },
      {
        template: '@(format_datetime("1979-07-18T15:00:00.000000Z", "M"))',
        output: '7'
      },
      {
        template: '@(format_datetime("NOT DATE", "YYYY-MM-DD"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'format_location(location)',
    summary: 'Formats the given `location` as its name.',
    detail: '',
    examples: [
      {
        template: '@(format_location("Rwanda"))',
        output: 'Rwanda'
      },
      {
        template: '@(format_location("Rwanda > Kigali"))',
        output: 'Kigali'
      }
    ]
  },
  {
    signature: 'format_number(number, places [, humanize])',
    summary: 'Formats `number` to the given number of decimal `places`.',
    detail:
      'An optional third argument `humanize` can be false to disable the use of thousand separators.',
    examples: [
      {
        template: '@(format_number(1234))',
        output: '1,234'
      },
      {
        template: '@(format_number(1234.5670))',
        output: '1,234.567'
      },
      {
        template: '@(format_number(1234.5670, 2, true))',
        output: '1,234.57'
      },
      {
        template: '@(format_number(1234.5678, 0, false))',
        output: '1235'
      },
      {
        template: '@(format_number("foo", 2, false))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'format_time(time [,format])',
    summary: 'Formats `time` as text according to the given `format`.',
    detail:
      "If `format` is not specified then the environment's default format is used. The format\nstring can consist of the following characters. The characters ' ', ':', ',', 'T', '-'\nand '_' are ignored. Any other character is an error.\n\n* `h`         - hour of the day 1-12\n* `hh`        - hour of the day 01-12\n* `tt`        - twenty four hour of the day 01-23\n* `m`         - minute 0-59\n* `mm`        - minute 00-59\n* `s`         - second 0-59\n* `ss`        - second 00-59\n* `fff`       - milliseconds\n* `ffffff`    - microseconds\n* `fffffffff` - nanoseconds\n* `aa`        - am or pm\n* `AA`        - AM or PM",
    examples: [
      {
        template: '@(format_time("14:50:30.000000"))',
        output: '14:50'
      },
      {
        template: '@(format_time("14:50:30.000000", "h:mm aa"))',
        output: '2:50 pm'
      },
      {
        template: '@(format_time("15:00:27.000000", "s"))',
        output: '27'
      },
      {
        template: '@(format_time("NOT TIME", "hh:mm"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'format_urn(urn)',
    summary: 'Formats `urn` into human friendly text.',
    detail: '',
    examples: [
      {
        template: '@(format_urn("tel:+250781234567"))',
        output: '0781 234 567'
      },
      {
        template: '@(format_urn("twitter:134252511151#billy_bob"))',
        output: 'billy_bob'
      },
      {
        template: '@(format_urn(contact.urn))',
        output: '(206) 555-1212'
      },
      {
        template: '@(format_urn(urns.tel))',
        output: '(206) 555-1212'
      },
      {
        template: '@(format_urn(urns.mailto))',
        output: 'foo@bar.com'
      },
      {
        template: '@(format_urn("NOT URN"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'if(test, value1, value2)',
    summary: 'Returns `value1` if `test` is truthy or `value2` if not.',
    detail: 'If the first argument is an error that error is returned.',
    examples: [
      {
        template: '@(if(1 = 1, "foo", "bar"))',
        output: 'foo'
      },
      {
        template: '@(if("foo" > "bar", "foo", "bar"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'is_error(value)',
    summary: 'Returns whether `value` is an error',
    detail: '',
    examples: [
      {
        template: '@(is_error(datetime("foo")))',
        output: 'true'
      },
      {
        template: '@(is_error(run.not.existing))',
        output: 'true'
      },
      {
        template: '@(is_error("hello"))',
        output: 'false'
      }
    ]
  },
  {
    signature: 'join(array, separator)',
    summary: 'Joins the given `array` of strings with `separator` to make text.',
    detail: '',
    examples: [
      {
        template: '@(join(array("a", "b", "c"), "|"))',
        output: 'a|b|c'
      },
      {
        template: '@(join(split("a.b.c", "."), " "))',
        output: 'a b c'
      }
    ]
  },
  {
    signature: 'json(value)',
    summary: 'Returns the JSON representation of `value`.',
    detail: '',
    examples: [
      {
        template: '@(json("string"))',
        output: '"string"'
      },
      {
        template: '@(json(10))',
        output: '10'
      },
      {
        template: '@(json(null))',
        output: 'null'
      },
      {
        template: '@(json(contact.uuid))',
        output: '"5d76d86b-3bb9-4d5a-b822-c9d86f5d8e4f"'
      }
    ]
  },
  {
    signature: 'lower(text)',
    summary: 'Converts `text` to lowercase.',
    detail: '',
    examples: [
      {
        template: '@(lower("HellO"))',
        output: 'hello'
      },
      {
        template: '@(lower("hello"))',
        output: 'hello'
      },
      {
        template: '@(lower("123"))',
        output: '123'
      },
      {
        template: '@(lower("😀"))',
        output: '😀'
      }
    ]
  },
  {
    signature: 'max(numbers...)',
    summary: 'Returns the maximum value in `numbers`.',
    detail: '',
    examples: [
      {
        template: '@(max(1, 2))',
        output: '2'
      },
      {
        template: '@(max(1, -1, 10))',
        output: '10'
      },
      {
        template: '@(max(1, 10, "foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'mean(numbers...)',
    summary: 'Returns the arithmetic mean of `numbers`.',
    detail: '',
    examples: [
      {
        template: '@(mean(1, 2))',
        output: '1.5'
      },
      {
        template: '@(mean(1, 2, 6))',
        output: '3'
      },
      {
        template: '@(mean(1, "foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'min(numbers...)',
    summary: 'Returns the minimum value in `numbers`.',
    detail: '',
    examples: [
      {
        template: '@(min(1, 2))',
        output: '1'
      },
      {
        template: '@(min(2, 2, -10))',
        output: '-10'
      },
      {
        template: '@(min(1, 2, "foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'mod(dividend, divisor)',
    summary: 'Returns the remainder of the division of `dividend` by `divisor`.',
    detail: '',
    examples: [
      {
        template: '@(mod(5, 2))',
        output: '1'
      },
      {
        template: '@(mod(4, 2))',
        output: '0'
      },
      {
        template: '@(mod(5, "foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'now()',
    summary: 'Returns the current date and time in the current timezone.',
    detail: '',
    examples: [
      {
        template: '@(now())',
        output: '2018-04-11T13:24:30.123456-05:00'
      }
    ]
  },
  {
    signature: 'number(value)',
    summary: 'Tries to convert `value` to a number.',
    detail: "An error is returned if the value can't be converted.",
    examples: [
      {
        template: '@(number(10))',
        output: '10'
      },
      {
        template: '@(number("123.45000"))',
        output: '123.45'
      },
      {
        template: '@(number("what?"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'object(pairs...)',
    summary: 'Takes property name value pairs and returns them as a new object.',
    detail: '',
    examples: [
      {
        template: '@(object())',
        output: '{}'
      },
      {
        template: '@(object("a", 123, "b", "hello"))',
        output: '{a: 123, b: hello}'
      },
      {
        template: '@(object("a"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'or(values...)',
    summary: 'Returns whether if any of the given `values` are truthy.',
    detail: '',
    examples: [
      {
        template: '@(or(true))',
        output: 'true'
      },
      {
        template: '@(or(true, false, true))',
        output: 'true'
      }
    ]
  },
  {
    signature: 'parse_datetime(text, format [,timezone])',
    summary: 'Parses `text` into a date using the given `format`.',
    detail:
      "The format string can consist of the following characters. The characters\n' ', ':', ',', 'T', '-' and '_' are ignored. Any other character is an error.\n\n* `YY`        - last two digits of year 0-99\n* `YYYY`      - four digits of year 0000-9999\n* `M`         - month 1-12\n* `MM`        - month 01-12\n* `D`         - day of month, 1-31\n* `DD`        - day of month, zero padded 0-31\n* `h`         - hour of the day 1-12\n* `hh`        - hour of the day 01-12\n* `tt`        - twenty four hour of the day 01-23\n* `m`         - minute 0-59\n* `mm`        - minute 00-59\n* `s`         - second 0-59\n* `ss`        - second 00-59\n* `fff`       - milliseconds\n* `ffffff`    - microseconds\n* `fffffffff` - nanoseconds\n* `aa`        - am or pm\n* `AA`        - AM or PM\n* `Z`         - hour and minute offset from UTC, or Z for UTC\n* `ZZZ`       - hour and minute offset from UTC\n\nTimezone should be a location name as specified in the IANA Time Zone database, such\nas \"America/Guayaquil\" or \"America/Los_Angeles\". If not specified, the current timezone\nwill be used. An error will be returned if the timezone is not recognized.\n\nNote that fractional seconds will be parsed even without an explicit format identifier.\nYou should only specify fractional seconds when you want to assert the number of places\nin the input format.\n\nparse_datetime will return an error if it is unable to convert the text to a datetime.",
    examples: [
      {
        template: '@(parse_datetime("1979-07-18", "YYYY-MM-DD"))',
        output: '1979-07-18T00:00:00.000000-05:00'
      },
      {
        template: '@(parse_datetime("2010 5 10", "YYYY M DD"))',
        output: '2010-05-10T00:00:00.000000-05:00'
      },
      {
        template: '@(parse_datetime("2010 5 10 12:50", "YYYY M DD tt:mm", "America/Los_Angeles"))',
        output: '2010-05-10T12:50:00.000000-07:00'
      },
      {
        template: '@(parse_datetime("NOT DATE", "YYYY-MM-DD"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'parse_json(text)',
    summary: 'Tries to parse `text` as JSON.',
    detail: 'If the given `text` is not valid JSON, then an error is returned',
    examples: [
      {
        template: '@(parse_json("{\\"foo\\": \\"bar\\"}").foo)',
        output: 'bar'
      },
      {
        template: '@(parse_json("[1,2,3,4]")[2])',
        output: '3'
      },
      {
        template: '@(parse_json("invalid json"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'parse_time(text, format)',
    summary: 'Parses `text` into a time using the given `format`.',
    detail:
      "The format string can consist of the following characters. The characters\n' ', ':', ',', 'T', '-' and '_' are ignored. Any other character is an error.\n\n* `h`         - hour of the day 1-12\n* `hh`        - hour of the day 01-12\n* `tt`        - twenty four hour of the day 01-23\n* `m`         - minute 0-59\n* `mm`        - minute 00-59\n* `s`         - second 0-59\n* `ss`        - second 00-59\n* `fff`       - milliseconds\n* `ffffff`    - microseconds\n* `fffffffff` - nanoseconds\n* `aa`        - am or pm\n* `AA`        - AM or PM\n\nNote that fractional seconds will be parsed even without an explicit format identifier.\nYou should only specify fractional seconds when you want to assert the number of places\nin the input format.\n\nparse_time will return an error if it is unable to convert the text to a time.",
    examples: [
      {
        template: '@(parse_time("15:28", "tt:mm"))',
        output: '15:28:00.000000'
      },
      {
        template: '@(parse_time("2:40 pm", "h:mm aa"))',
        output: '14:40:00.000000'
      },
      {
        template: '@(parse_time("NOT TIME", "tt:mm"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'percent(number)',
    summary: 'Formats `number` as a percentage.',
    detail: '',
    examples: [
      {
        template: '@(percent(0.54234))',
        output: '54%'
      },
      {
        template: '@(percent(1.2))',
        output: '120%'
      },
      {
        template: '@(percent("foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'rand()',
    summary: 'Returns a single random number between [0.0-1.0).',
    detail: '',
    examples: [
      {
        template: '@(rand())',
        output: '0.3849275689214193274523267973563633859157562255859375'
      },
      {
        template: '@(rand())',
        output: '0.607552015674623913099594574305228888988494873046875'
      }
    ]
  },
  {
    signature: 'rand_between()',
    summary: 'A single random integer in the given inclusive range.',
    detail: '',
    examples: [
      {
        template: '@(rand_between(1, 10))',
        output: '5'
      },
      {
        template: '@(rand_between(1, 10))',
        output: '10'
      }
    ]
  },
  {
    signature: 'read_chars(text)',
    summary: 'Converts `text` into something that can be read by IVR systems.',
    detail:
      'ReadChars will split the numbers such as they are easier to understand. This includes\nsplitting in 3s or 4s if appropriate.',
    examples: [
      {
        template: '@(read_chars("1234"))',
        output: '1 2 3 4'
      },
      {
        template: '@(read_chars("abc"))',
        output: 'a b c'
      },
      {
        template: '@(read_chars("abcdef"))',
        output: 'a b c , d e f'
      }
    ]
  },
  {
    signature: 'regex_match(text, pattern [,group])',
    summary: 'Returns the first match of the regular expression `pattern` in `text`.',
    detail: 'An optional third parameter `group` determines which matching group will be returned.',
    examples: [
      {
        template: '@(regex_match("sda34dfddg67", "\\d+"))',
        output: '34'
      },
      {
        template: '@(regex_match("Bob Smith", "(\\w+) (\\w+)", 1))',
        output: 'Bob'
      },
      {
        template: '@(regex_match("Bob Smith", "(\\w+) (\\w+)", 2))',
        output: 'Smith'
      },
      {
        template: '@(regex_match("Bob Smith", "(\\w+) (\\w+)", 5))',
        output: 'ERROR'
      },
      {
        template: '@(regex_match("abc", "[\\."))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'remove_first_word(text)',
    summary: 'Removes the first word of `text`.',
    detail: '',
    examples: [
      {
        template: '@(remove_first_word("foo bar"))',
        output: 'bar'
      },
      {
        template: '@(remove_first_word("Hi there. I\'m a flow!"))',
        output: "there. I'm a flow!"
      }
    ]
  },
  {
    signature: 'repeat(text, count)',
    summary: 'Returns `text` repeated `count` number of times.',
    detail: '',
    examples: [
      {
        template: '@(repeat("*", 8))',
        output: '********'
      },
      {
        template: '@(repeat("*", "foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'replace(text, needle, replacement [, count])',
    summary: 'Replaces up to `count` occurrences of `needle` with `replacement` in `text`.',
    detail: 'If `count` is omitted or is less than 0 then all occurrences are replaced.',
    examples: [
      {
        template: '@(replace("foo bar foo", "foo", "zap"))',
        output: 'zap bar zap'
      },
      {
        template: '@(replace("foo bar foo", "foo", "zap", 1))',
        output: 'zap bar foo'
      },
      {
        template: '@(replace("foo bar", "baz", "zap"))',
        output: 'foo bar'
      }
    ]
  },
  {
    signature: 'replace_time(datetime)',
    summary: 'Returns a new datetime with the time part replaced by the `time`.',
    detail: '',
    examples: [
      {
        template: '@(replace_time(now(), "10:30"))',
        output: '2018-04-11T10:30:00.000000-05:00'
      },
      {
        template: '@(replace_time("2017-01-15", "10:30"))',
        output: '2017-01-15T10:30:00.000000-05:00'
      },
      {
        template: '@(replace_time("foo", "10:30"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'round(number [,places])',
    summary: 'Rounds `number` to the nearest value.',
    detail:
      'You can optionally pass in the number of decimal places to round to as `places`. If `places` < 0,\nit will round the integer part to the nearest 10^(-places).',
    examples: [
      {
        template: '@(round(12))',
        output: '12'
      },
      {
        template: '@(round(12.141))',
        output: '12'
      },
      {
        template: '@(round(12.6))',
        output: '13'
      },
      {
        template: '@(round(12.141, 2))',
        output: '12.14'
      },
      {
        template: '@(round(12.146, 2))',
        output: '12.15'
      },
      {
        template: '@(round(12.146, -1))',
        output: '10'
      },
      {
        template: '@(round("notnum", 2))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'round_down(number [,places])',
    summary: 'Rounds `number` down to the nearest integer value.',
    detail: 'You can optionally pass in the number of decimal places to round to as `places`.',
    examples: [
      {
        template: '@(round_down(12))',
        output: '12'
      },
      {
        template: '@(round_down(12.141))',
        output: '12'
      },
      {
        template: '@(round_down(12.6))',
        output: '12'
      },
      {
        template: '@(round_down(12.141, 2))',
        output: '12.14'
      },
      {
        template: '@(round_down(12.146, 2))',
        output: '12.14'
      },
      {
        template: '@(round_down("foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'round_up(number [,places])',
    summary: 'Rounds `number` up to the nearest integer value.',
    detail: 'You can optionally pass in the number of decimal places to round to as `places`.',
    examples: [
      {
        template: '@(round_up(12))',
        output: '12'
      },
      {
        template: '@(round_up(12.141))',
        output: '13'
      },
      {
        template: '@(round_up(12.6))',
        output: '13'
      },
      {
        template: '@(round_up(12.141, 2))',
        output: '12.15'
      },
      {
        template: '@(round_up(12.146, 2))',
        output: '12.15'
      },
      {
        template: '@(round_up("foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'split(text, delimiters)',
    summary: 'Splits `text` based on the given characters in `delimiters`.',
    detail: 'Empty values are removed from the returned list.',
    examples: [
      {
        template: '@(split("a b c", " "))',
        output: '[a, b, c]'
      },
      {
        template: '@(split("a", " "))',
        output: '[a]'
      },
      {
        template: '@(split("abc..d", "."))',
        output: '[abc, d]'
      },
      {
        template: '@(split("a.b.c.", "."))',
        output: '[a, b, c]'
      },
      {
        template: '@(split("a|b,c  d", " .|,"))',
        output: '[a, b, c, d]'
      }
    ]
  },
  {
    signature: 'text(value)',
    summary: 'Tries to convert `value` to text.',
    detail: "An error is returned if the value can't be converted.",
    examples: [
      {
        template: '@(text(3 = 3))',
        output: 'true'
      },
      {
        template: '@(json(text(123.45)))',
        output: '"123.45"'
      },
      {
        template: '@(text(1 / 0))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'text_compare(text1, text2)',
    summary: 'Returns the dictionary order of `text1` and `text2`.',
    detail:
      'The return value will be -1 if `text1` comes before `text2`, 0 if they are equal\nand 1 if `text1` comes after `text2`.',
    examples: [
      {
        template: '@(text_compare("abc", "abc"))',
        output: '0'
      },
      {
        template: '@(text_compare("abc", "def"))',
        output: '-1'
      },
      {
        template: '@(text_compare("zzz", "aaa"))',
        output: '1'
      }
    ]
  },
  {
    signature: 'text_length(value)',
    summary: 'Returns the length (number of characters) of `value` when converted to text.',
    detail: '',
    examples: [
      {
        template: '@(text_length("abc"))',
        output: '3'
      },
      {
        template: '@(text_length(array(2, 3)))',
        output: '6'
      }
    ]
  },
  {
    signature: 'text_slice(text, start [, end])',
    summary: 'Returns the portion of `text` between `start` (inclusive) and `end` (exclusive).',
    detail:
      'If `end` is not specified then the entire rest of `text` will be included. Negative values\nfor `start` or `end` start at the end of `text`.',
    examples: [
      {
        template: '@(text_slice("hello", 2))',
        output: 'llo'
      },
      {
        template: '@(text_slice("hello", 1, 3))',
        output: 'el'
      },
      {
        template: '@(text_slice("hello😁", -3, -1))',
        output: 'lo'
      },
      {
        template: '@(text_slice("hello", 7))',
        output: ''
      }
    ]
  },
  {
    signature: 'time(value)',
    summary: 'Tries to convert `value` to a time.',
    detail:
      "If it is text then it will be parsed into a time using the default time format.\nAn error is returned if the value can't be converted.",
    examples: [
      {
        template: '@(time("10:30"))',
        output: '10:30:00.000000'
      },
      {
        template: '@(time("10:30:45 PM"))',
        output: '22:30:45.000000'
      },
      {
        template: '@(time(datetime("1979-07-18T10:30:45.123456Z")))',
        output: '10:30:45.123456'
      },
      {
        template: '@(time("what?"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'time_from_parts(hour, minute, second)',
    summary: 'Creates a time from `hour`, `minute` and `second`',
    detail: '',
    examples: [
      {
        template: '@(time_from_parts(14, 40, 15))',
        output: '14:40:15.000000'
      },
      {
        template: '@(time_from_parts(8, 10, 0))',
        output: '08:10:00.000000'
      },
      {
        template: '@(time_from_parts(25, 0, 0))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'title(text)',
    summary: 'Capitalizes each word in `text`.',
    detail: '',
    examples: [
      {
        template: '@(title("foo"))',
        output: 'Foo'
      },
      {
        template: '@(title("ryan lewis"))',
        output: 'Ryan Lewis'
      },
      {
        template: '@(title("RYAN LEWIS"))',
        output: 'Ryan Lewis'
      },
      {
        template: '@(title(123))',
        output: '123'
      }
    ]
  },
  {
    signature: 'today()',
    summary: 'Returns the current date in the environment timezone.',
    detail: '',
    examples: [
      {
        template: '@(today())',
        output: '2018-04-11'
      }
    ]
  },
  {
    signature: 'tz(date)',
    summary: 'Returns the name of the timezone of `date`.',
    detail:
      'If no timezone information is present in the date, then the current timezone will be returned.',
    examples: [
      {
        template: '@(tz("2017-01-15T02:15:18.123456Z"))',
        output: 'UTC'
      },
      {
        template: '@(tz("2017-01-15 02:15:18PM"))',
        output: 'America/Guayaquil'
      },
      {
        template: '@(tz("2017-01-15"))',
        output: 'America/Guayaquil'
      },
      {
        template: '@(tz("foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'tz_offset(date)',
    summary: 'Returns the offset of the timezone of `date`.',
    detail:
      'The offset is returned in the format `[+/-]HH:MM`. If no timezone information is present in the date,\nthen the current timezone offset will be returned.',
    examples: [
      {
        template: '@(tz_offset("2017-01-15T02:15:18.123456Z"))',
        output: '+0000'
      },
      {
        template: '@(tz_offset("2017-01-15 02:15:18PM"))',
        output: '-0500'
      },
      {
        template: '@(tz_offset("2017-01-15"))',
        output: '-0500'
      },
      {
        template: '@(tz_offset("foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'upper(text)',
    summary: 'Converts `text` to lowercase.',
    detail: '',
    examples: [
      {
        template: '@(upper("Asdf"))',
        output: 'ASDF'
      },
      {
        template: '@(upper(123))',
        output: '123'
      }
    ]
  },
  {
    signature: 'url_encode(text)',
    summary: 'Encodes `text` for use as a URL parameter.',
    detail: '',
    examples: [
      {
        template: '@(url_encode("two & words"))',
        output: 'two%20%26%20words'
      },
      {
        template: '@(url_encode(10))',
        output: '10'
      }
    ]
  },
  {
    signature: 'urn_parts(urn)',
    summary: 'Parses a URN into its different parts',
    detail: '',
    examples: [
      {
        template: '@(urn_parts("tel:+593979012345"))',
        output: '{display: , path: +593979012345, scheme: tel}'
      },
      {
        template: '@(urn_parts("twitterid:3263621177#bobby"))',
        output: '{display: bobby, path: 3263621177, scheme: twitterid}'
      }
    ]
  },
  {
    signature: 'weekday(date)',
    summary: 'Returns the day of the week for `date`.',
    detail:
      'The week is considered to start on Sunday so a Sunday returns 0, a Monday returns 1 etc.',
    examples: [
      {
        template: '@(weekday("2017-01-15"))',
        output: '0'
      },
      {
        template: '@(weekday("foo"))',
        output: 'ERROR'
      }
    ]
  },
  {
    signature: 'word(text, index [,delimiters])',
    summary: 'Returns the word at `index` in `text`.',
    detail:
      'Indexes start at zero. There is an optional final parameter `delimiters` which\nis string of characters used to split the text into words.',
    examples: [
      {
        template: '@(word("bee cat dog", 0))',
        output: 'bee'
      },
      {
        template: '@(word("bee.cat,dog", 0))',
        output: 'bee'
      },
      {
        template: '@(word("bee.cat,dog", 1))',
        output: 'cat'
      },
      {
        template: '@(word("bee.cat,dog", 2))',
        output: 'dog'
      },
      {
        template: '@(word("bee.cat,dog", -1))',
        output: 'dog'
      },
      {
        template: '@(word("bee.cat,dog", -2))',
        output: 'cat'
      },
      {
        template: '@(word("bee.*cat,dog", 1, ".*=|"))',
        output: 'cat,dog'
      },
      {
        template: '@(word("O\'Grady O\'Flaggerty", 1, " "))',
        output: "O'Flaggerty"
      }
    ]
  },
  {
    signature: 'word_count(text [,delimiters])',
    summary: 'Returns the number of words in `text`.',
    detail:
      'There is an optional final parameter `delimiters` which is string of characters used\nto split the text into words.',
    examples: [
      {
        template: '@(word_count("foo bar"))',
        output: '2'
      },
      {
        template: '@(word_count(10))',
        output: '1'
      },
      {
        template: '@(word_count(""))',
        output: '0'
      },
      {
        template: '@(word_count("😀😃😄😁"))',
        output: '4'
      },
      {
        template: '@(word_count("bee.*cat,dog", ".*=|"))',
        output: '2'
      },
      {
        template: '@(word_count("O\'Grady O\'Flaggerty", " "))',
        output: '2'
      }
    ]
  },
  {
    signature: 'word_slice(text, start, end [,delimiters])',
    summary: 'Extracts a sub-sequence of words from `text`.',
    detail:
      'The returned words are those from `start` up to but not-including `end`. Indexes start at zero and a negative\nend value means that all words after the start should be returned. There is an optional final parameter `delimiters`\nwhich is string of characters used to split the text into words.',
    examples: [
      {
        template: '@(word_slice("bee cat dog", 0, 1))',
        output: 'bee'
      },
      {
        template: '@(word_slice("bee cat dog", 0, 2))',
        output: 'bee cat'
      },
      {
        template: '@(word_slice("bee cat dog", 1, -1))',
        output: 'cat dog'
      },
      {
        template: '@(word_slice("bee cat dog", 1))',
        output: 'cat dog'
      },
      {
        template: '@(word_slice("bee cat dog", 2, 3))',
        output: 'dog'
      },
      {
        template: '@(word_slice("bee cat dog", 3, 10))',
        output: ''
      },
      {
        template: '@(word_slice("bee.*cat,dog", 1, -1, ".*=|,"))',
        output: 'cat dog'
      },
      {
        template: '@(word_slice("O\'Grady O\'Flaggerty", 1, 2, " "))',
        output: "O'Flaggerty"
      }
    ]
  }
];
const { getOpts } = require('./utils');
exports.handler = (evt, ctx, cb) => cb(null, getOpts({ body: JSON.stringify(functions) }));
