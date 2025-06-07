import { useRouter } from "next/router";
import { UiButton } from "../components/ui/UiButton";
import Head from 'next/head';

export default function HomePage() {
  const router = useRouter();

  function goTo() {
	router.push("/serverSentencesMenu");
  }

  return (
	<>
	<Head>
        <title>LearnEnglish - Приложение для тренировки перевода английских предложений</title>
        <meta name="description" content="Приложение для изучения английского языка на основе плейлистов Александра Бебриса, разработано для своего сына без коммерческого умысла" key="desc" />
        <meta name="keywords" content="английский язык, тренировка перевода, изучение английского, практика английского, перевод предложений, грамматика английского, словарный запас" />
    </Head>
    <div className="px-4">
      <div className="w-full max-w-4xl mx-auto bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80"
      >
		<h1 className="text-2xl font-black text-yellow-900 uppercase text-center">Добро пожаловать</h1>
      </div>
	  <UiButton
		className="block mt-8 mx-auto w-full max-w-4xl"
	    onClick={goTo}>Перевод предложений</UiButton>
    </div>
	</>
  );
}
