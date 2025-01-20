export const dynamic = 'force-static';
import MOCK_DATA from '@/app/mock/guess.json';

export async function GET() {
  return Response.json(
    MOCK_DATA.map((guess) => {
      const lf = new Intl.ListFormat('es');
      let guessTransformed;
      if (guess.names.length > 2) {
        const [firstPerson] = guess.names;
        guessTransformed = { ...guess, names: `${firstPerson} y familia` };
      } else {
        guessTransformed = { ...guess, names: lf.format(guess.names) };
      }
      return guessTransformed;
    })
  );
}
