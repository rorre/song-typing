# Song Typing

A game inspired by [this video](https://www.youtube.com/watch?v=o8U2KAXImH8)

[![](https://img.youtube.com/vi/o8U2KAXImH8/0.jpg)](https://www.youtube.com/watch?v=o8U2KAXImH8)

## Basics

1. Add the chart into `songs` folder
2. Refresh
3. Play the song

## Settings

### Offset

As always with any music games, offset is important. This will change the judgement window to adjust with
your timing. (+) if you feel that the judgement is too late, (-) if its too early.

### Enforce Space

Defaults to false. If enabled, all spaces will need to be typed during gameplay. If not, then all spaces
are automatically done for you, so you never have to press space.

## Charting

All data is written in JSON, including the lyrics. There is a plan to support other file format, but this will
do for now. You only need your lyrics, metadata and song to get the minimum working.

### `song.json`

We need the song's metadata first in a file called `song.json`. The contents of the file is as follows:

```json
{
  "artist": "siromaru + cranky",
  "title": "conflict",
  "src": "conflict.mp3",
  "cover": "cover.jpg",
  "difficulty": 10
}
```

The file path are relevant to the song's directory.

- `cover` is optional, and may be left empty. It will be used as the song's jacket in song selection menu
- `src` is the audio file
- The rest is self-explanatory.

There is no guideline for difficulty as of yet, so feel free to judge your own.

### `lyrics.json`

Now, into the lyrics, this is a JSON array that satisfies the following typescript interface:

```ts
interface Lyric {
  startTime: number;
  endTime: number;
  lyric: string;
  ignore?: boolean;
}

type JSONData = Lyric[];
```

- `startTime`: The start time for current lyric row, in miliseconds
- `endTime`: The end time for current lyric row, in miliseconds
- `lyric`: Lyric for current row
- `ignore`: Whether to ignore this row, leaving this to `true` means that all inputs will be ignored.
  Can be used for aesthetic tricks

An example is as follows:

```json
[
  { "startTime": 0, "endTime": 9736, "lyric": "[INTRO]", "ignore": true },
  { "startTime": 9736, "endTime": 11986, "lyric": "In a desperate conflict" },
  { "startTime": 11986, "endTime": 14236, "lyric": "With a ruthless enemy" }
]
```
