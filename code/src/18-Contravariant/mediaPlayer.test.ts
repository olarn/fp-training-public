interface MediaPlayer<A> {
  play: (a: A) => string[]
}

type MP3 = { type: 'mp3', data: string[] }

const mp3Player: MediaPlayer<MP3> = {
  play: (mp3) => mp3.data,
}

// -------------------------------------------------------------------------------

const contramap = <A, B>(f: (b: B) => A) => (p: MediaPlayer<A>): MediaPlayer<B> => ({ play: (b: B) => p.play(f(b)) })

type WAV = { type: 'wav', data: string[] }

const wavToMp3 = (wav: WAV): MP3 => {
  return { type: 'mp3', data: wav.data.map(d => d + ' converted to mp3') }
}

const play = (mp3Player: MediaPlayer<MP3>) => (wavSong: WAV): string[] => {
  return contramap(wavToMp3)(mp3Player).play(wavSong)
}

// -------------------------------------------------------------------------------

describe("mediaPlayer", () => {
  it('should be able to play wav song with mp3 media player', () => {
    const wavSong: WAV = { type: 'wav', data: ['Hello', 'World'] }
    expect(
      play(mp3Player)(wavSong)
    ).toEqual(
      ['Hello converted to mp3', 'World converted to mp3']
    )
  })
})