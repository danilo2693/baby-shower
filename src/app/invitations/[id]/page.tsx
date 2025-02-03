import Baby from '@/app/components/Baby';
import { Button } from '@/app/components/Button';
import { DateAndTime } from '@/app/components/DateAndTime';
import Lottie from '@/app/components/Lottie';
import { StartWithConfeti } from '@/app/components/StartWithConfeti';
import { CiGift, CiLocationOn } from 'react-icons/ci';
import { FaWhatsapp } from 'react-icons/fa';
import './styles.css';
import Confirmed from '@/app/components/Confirmed';

export default async function InvitationById({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guestData = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/guests/${id}`
  );

  const guest = await guestData.json();

  const generalDataResponse = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/general-data`
  );

  const generalData = await generalDataResponse?.json();

  const custom_whatsapp_message = generalData?.whatsapp_message.replace(
    '{{names}}',
    guest.names
  );

  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen bg-persian-pink-50 py-[30rem] sm:py-0 text-gray-800">
        <section className="bg-white flex flex-col items-center p-4 sm:p-2 shadow-2xl relative rounded-xl pt-16 sm:pt-2 w-[500px] sm:w-[90vw]">
          <div className="h-52 sm:h-16 w-52 sm:w-16 cursor-pointer absolute left-[-100px] sm:left-[-16px] top-[-100px] sm:top-[-36px]">
            <Lottie src={'/cloud.lottie'} />
          </div>

          <h1 className="font-cookie sm:text-6xl text-8xl text-persian-pink-600">
            {generalData?.title}
          </h1>
          <h3>{generalData?.title_description}</h3>
          <div className="flex items-center">
            <StartWithConfeti />
            <h1 className="font-dancing sm:text-4xl text-6xl">
              {generalData?.baby_name}
            </h1>
            <StartWithConfeti />
          </div>
          <div className="h-[400px] w-[500px] sm:h-[300px] sm:w-[300px] relative ">
            <Baby src="/baby.lottie" />
            <div className="absolute top-7 sm:top-3 left-40 sm:left-14 font-cookie-fallback text-3xl sm:text-xl flex flex-col gap-2">
              <p className="font-dancing text-center">
                {generalData?.description}
              </p>
              <DateAndTime generalData={generalData} />
              <span className="flex gap-1 items-center justify-center text-xl text-center">
                <p>{generalData?.address}</p>
              </span>
              <span className="flex items-center justify-around">
                <Button
                  text={generalData?.location_button_label}
                  url={generalData?.location_url}
                >
                  <CiLocationOn />
                </Button>
                <Button
                  text={generalData?.confirm_button_label}
                  url={custom_whatsapp_message}
                  showConfirm={true}
                  id={id}
                  maxDateToConfirm={generalData.max_date_to_confirm}
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
            <p className="leading-3">{generalData?.gift_message}</p>
          </span>
          <span className="font-cookie sm:text-3xl text-5xl text-persian-pink-600">
            {generalData?.bye_text}
          </span>
          <span className="font-cookie sm:text-3xl text-5xl ">
            {guest.names}
          </span>
          <Confirmed id={id} initialConfirm={guest.isConfirmed} />
        </section>
      </main>
    </>
  );
}
