import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../State/userSlice';
import './NamePage.css';
import HowToPlayInfo from '../Components/HowToPlayInfo';

export default function NamePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const nameOk = name.trim().length >= 1;
  const ageNumber = useMemo(() => {
    const n = Number(age);
    return Number.isFinite(n) ? n : NaN;
  }, [age]);
  const ageOk = age !== "" && ageNumber >= 1 && ageNumber <= 119;

  const formOk = nameOk && ageOk;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); 
    if (!formOk) return;
    dispatch(
      setUser({
        name: name.trim(),
        age: ageNumber,
      })
    );

    navigate("/reSort");
  };

  return (
    <main className="welcome">
      <header className="welcome__header">
        <img
          className="welcome__logo"
          src="/assets/recycling.png"
          alt="Recycling Master"
        />
        <h1 className="welcome__title">
          Welcome to the game <span>Recycling Master</span>!
        </h1>
        <p className="welcome__subtitle">
          Help the city sort waste, craft products, and save the planet.
        </p>
      </header>

      <section className="welcome__panel">
        <form className="welcome__form" onSubmit={handleSubmit} noValidate>
          <div className="form__row">
            <label htmlFor="playerName" className="form__label">
              User name
            </label>
            <input
              id="playerName"
              className="form__input"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value.replace(/\s/g, ''))}
              maxLength={40}
              required
            />
            {submitted && !nameOk && (
              <div className="form__error">
                Enter at least 1 character.
              </div>
            )}
          </div>

          <div className="form__row">
            <label htmlFor="playerAge" className="form__label">
              Age
            </label>
            <input
              id="playerAge"
              className="form__input"
              type="number"
              inputMode="numeric"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min={1}
              max={119}
              required
            />
            {submitted && !ageOk && (
              <div className="form__error">Enter an age between 1 and 119.</div>
            )}
          </div>

          <details className="welcome__howto" open>
            <HowToPlayInfo />
          </details>

          <button className="welcome__cta" type="submit">
            All set, let’s begin!
          </button>
        </form>
      </section>
    </main>
  );
}
