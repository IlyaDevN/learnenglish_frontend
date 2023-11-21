import clsx from "clsx";
import InputBlock from "./ui/InputBlock";
import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "./ui/UiButton";
import Link from "next/link";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "900"],
});

export default function AuthForm({ isRegistered }) {

  return (
    <form
      className={clsx(
        sourceSans3.className,
        "w-full flex flex-col gap-5 bg-opacity-80",
      )}
    >
      {isRegistered || (
        <InputBlock
          fieldType={"text"}
          tip={"имя"}
          placeholder="Ведите ваше имя"
        />
      )}

      <InputBlock
        fieldType={"text"}
        tip={"e-mail"}
        placeholder="Введите ваш e-mail"
      />
      <InputBlock fieldType={"password"} tip={"пароль"} />
      {isRegistered || (
        <InputBlock fieldType={"password"} tip={"повторите пароль"} />
      )}
      <UiButton> {isRegistered ? "войти" : "подтвердить"} </UiButton>
      <div className="text-sm font-normal text-yellow-900 text-center">
        Регистрируясь на сайте, вы соглашаетесь с
        <Link className="text-lime-500" href="">
          {" Правилами и условиями"}
        </Link>{" "}
        и
        <Link className="text-lime-500" href="">
          {" политикой конфиденциальности"}
        </Link>
      </div>
    </form>
  );
}
