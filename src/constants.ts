import { Song } from "./types";

export const CONFLICT: Song = {
  artist: "siromaru + cranky",
  title: "conflict",
  src: "/conflict.mp3",
  difficulty: 10,
  lyrics: [
    {
      startTime: 0,
      endTime: 9736,
      lyric: "[INTRO]",
      ignore: true,
    },
    {
      startTime: 9736,
      endTime: 11986,
      lyric: "In a desperate conflict",
    },
    {
      startTime: 11986,
      endTime: 13486,
      lyric: "With a ruthless enemy",
    },
    {
      startTime: 14236,
      endTime: 17611,
      lyric: "Zuorhi viyantas was festsu ruor proi",
    },
    {
      startTime: 17611,
      endTime: 20611,
      lyric: "Yuk dalfe suoivo swenne yat vu henvi nes",
    },
    {
      startTime: 20611,
      endTime: 23611,
      lyric: "Sho fu briyu praffi stassui tsenva chies",
    },
    {
      startTime: 23611,
      endTime: 26611,
      lyric: "Ien ryus sois nyat pyaro shennie fru",
    },
    {
      startTime: 26611,
      endTime: 29611,
      lyric: "Prasueno turoden shes vi hyu vu praviya",
    },
    {
      startTime: 29611,
      endTime: 32611,
      lyric: "Tyu prostes fis hien hesnie ryanmie proshuka",
    },
    {
      startTime: 32611,
      endTime: 35796,
      lyric: "Wi swen ryasta grouts froine shienhie var yat",
    },
    {
      startTime: 35796,
      endTime: 38986,
      lyric: "Nyam raika rit skuois trapa tof",
    },
  ],
};

export const LAGTRAIN: Song = {
  artist: "inabakumori",
  title: "Lagtrain",
  src: "/lagtrain.mp3",
  difficulty: 8,
  lyrics: [
    {
      startTime: 3333,
      endTime: 9863,
      lyric: "Lagtrain",
      ignore: true,
    },
    {
      startTime: 9863,
      endTime: 12721,
      lyric: "hanarebanare no machi o",
    },
    {
      startTime: 12721,
      endTime: 16394,
      lyric: "tsunagu ressha wa itte shimatta ne",
    },
    {
      startTime: 16394,
      endTime: 19659,
      lyric: "nakushita kotoba o shiranai nara",
    },
    {
      startTime: 19659,
      endTime: 22925,
      lyric: "poketto de nigirishimete",
    },
    {
      startTime: 22925,
      endTime: 25782,
      lyric: "agaita iki o sutete",
    },
    {
      startTime: 25782,
      endTime: 29455,
      lyric: "nobiru kyou wa nemutte gomakase",
    },
    {
      startTime: 29455,
      endTime: 32721,
      lyric: "nakushita kotoba o shiranai nara",
    },
    {
      startTime: 32721,
      endTime: 35986,
      lyric: "kakueki teisha ni norikonde",
    },
    {
      startTime: 35986,
      endTime: 49047,
      lyric: "[INSTRUMENTAL]",
      ignore: true,
    },
    {
      startTime: 49047,
      endTime: 55578,
      lyric: "yuugata to taikutsu no osasoi o kotowatte",
    },
    {
      startTime: 55578,
      endTime: 61700,
      lyric: "hitorikiri rojiura wa kesshite isoganaide",
    },
    {
      startTime: 61700,
      endTime: 68231,
      lyric: "hora oudan hodou mo matte kure to itteru",
    },
    {
      startTime: 68231,
      endTime: 75170,
      lyric: "miharu machikado ga anata o hikitometeku",
    },

    {
      startTime: 75170,
      endTime: 78027,
      lyric: "hanarebanare no machi o",
    },
    {
      startTime: 78027,
      endTime: 81700,
      lyric: "tsunagu ressha wa itte shimatta ne",
    },
    {
      startTime: 81700,
      endTime: 84965,
      lyric: "nakushita kotoba o shiranai nara",
    },
    {
      startTime: 84965,
      endTime: 88231,
      lyric: "poketto de nigirishimete",
    },

    {
      startTime: 88231,
      endTime: 91088,
      lyric: "agaita yume o sutete",
    },
    {
      startTime: 91088,
      endTime: 94761,
      lyric: "yureru kyou wa nemutte gomakase",
    },
    {
      startTime: 94761,
      endTime: 98027,
      lyric: "nakushita kotoba o shiranai nara",
    },
    {
      startTime: 98027,
      endTime: 101292,
      lyric: "kakueki teisha ni norikonde",
    },
  ],
};

export const fakedb = [CONFLICT, LAGTRAIN];
