import React from "react";
import classes from "./Hero.sass";
import misc from "../../assets/sass/misc.sass";
import logoImage from "../../assets/images/logo.svg";

const hero = () => (
  <div className={classes.Hero}>
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <div className={classes.Hero__title}>
            Далеко-далеко за словесными горами в стране.
          </div>
          <div className={classes.Hero__text}>
            Далеко-далеко за словесными горами в стране, гласных и согласных
            живут рыбные тексты. Реторический текст знаках вопроса назад,
            родного рыбными собрал безорфографичный агенство власти ты
            переписывается встретил что своего, по всей одна моей журчит?
          </div>
          <div className={classes.Hero__buttons}>
            <a href="#" className={[classes.Hero__start, misc.btn].join(" ")}>
              Начать
            </a>
            <a
              href="#"
              className={[
                classes.Hero__register,
                misc.btn,
                misc.transparent,
              ].join(" ")}
            >
              Регистрация
            </a>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className={classes.Hero__image}>
            <img src={logoImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default hero;
