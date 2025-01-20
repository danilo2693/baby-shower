import Baby from '@/app/components/Baby';
import { Button } from '@/app/components/Button';
import Lottie from '@/app/components/Lottie';
import { StartWithConfeti } from '@/app/components/StartWithConfeti';
import { CiGift, CiLocationOn } from 'react-icons/ci';
import { FaWhatsapp } from 'react-icons/fa';

export default async function InvitationById({ params }) {
  const { id } = await params;
  const guessData = await fetch(`http://localhost:3000/api/guess/${id}`);
  const guess = await guessData.json();
  const generalData = {
    title: 'Baby Shower',
    subtitle: 'En honor a:',
    introduction:
      'Nuestra princesa está por llegar, así que festejemos juntos este día tan especial.',
    name: 'Samantha',
    date: '2025-02-23 14:00:00',
    address: 'Buga, Salon de eventos Villa campestre',
    location: 'https://maps.app.goo.gl/KQm49gbUWNrvnQ5x9',
    whatsappUrl: `https://wa.me/573162299694?text=Hola soy/somos ${guess.names}, me gustaría confirmarte la asistencia al Baby Shower de Sam, allá nos vemos!!!.`
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen bg-persian-pink-50 py-40 sm:py-0">
        <section className="bg-white flex flex-col items-center p-4 sm:p-2 shadow-2xl relative rounded-xl pt-16 sm:pt-2">
          <div className="h-52 sm:h-16 w-52 sm:w-16 cursor-pointer absolute left-[-100px] sm:left-[-16px] top-[-100px] sm:top-[-36px]">
            <Lottie src={'/cloud.lottie'} />
          </div>

          <h1 className="font-cookie sm:text-6xl text-8xl text-persian-pink-600">
            {generalData.title}
          </h1>
          <h3>{generalData.subtitle}</h3>
          <div className="flex items-center">
            <StartWithConfeti />
            <h1 className="font-dancing sm:text-4xl text-6xl">
              {generalData.name}
            </h1>
            <StartWithConfeti />
          </div>
          <div className="h-[400px] w-[500px] sm:h-[300px] sm:w-[300px] relative ">
            <Baby src="/baby.lottie" />
            <div className="absolute top-7 sm:top-3 left-40 sm:left-14 font-cookie-fallback text-3xl sm:text-xl flex flex-col gap-2">
              <p className="font-dancing text-center">
                {generalData.introduction}
              </p>
              <span className="flex flex-col gap-1 items-center">
                <p className="text-persian-pink-400 pl-3">Febrero</p>
                <div className="flex gap-4 items-center justify-around">
                  <span className="border-t-2 border-b-2">Domingo</span>
                  <span className="text-persian-pink-400 text-4xl sm:text-2xl font-bold">
                    23
                  </span>
                  <span className="border-t-2 border-b-2">2:00PM</span>
                </div>
                <p className="text-persian-pink-400 pl-3">2025</p>
              </span>
              <span className="flex gap-1 items-center justify-center text-xl text-center">
                <p>{generalData.address}</p>
              </span>
              <span className="flex items-center justify-around">
                <Button text="Ver ubicación" url={generalData.location}>
                  <CiLocationOn />
                </Button>
                <Button
                  text="Confirmar asistencia"
                  url={generalData.whatsappUrl}
                >
                  <FaWhatsapp />
                </Button>
              </span>
            </div>
          </div>

          <span className="flex gap-1 items-center pb-2 sm:pt-4 text-sm sm:text-[0.75rem]">
            <i className="text-persian-pink-400">
              <CiGift />
            </i>
            <p>Regalo sugerido: Pañitos humedos o pañales etapa 1 o más</p>
          </span>
          <span className="font-cookie sm:text-3xl text-5xl text-persian-pink-600">
            Te esperamos
          </span>
          <span className="font-cookie sm:text-3xl text-5xl ">
            {guess.names}
          </span>
        </section>
      </main>
    </>
  );
}
