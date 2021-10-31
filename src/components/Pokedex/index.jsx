import { useEffect, useState } from 'react';

import './style.css';
import pokeballImg from '../../assets/img/pokeball.png';

import SearchInput from '../SearchInput';

import usePokeData from '../../Hooks/usePokeData';

import Error from '../helpers/Error';
import typeColors from '../helpers/typeColors';

import useVoiceOutput from '../../Hooks/useVoiceOutput';

export default function Pokedex() {
  const [searchText, setSearchText] = useState('');

  const { pokeInfo, error } = usePokeData(searchText);

  const [currentPokeIndex, setCurrentPokeIndex] = useState(undefined);

  //pokemon name/description input and voice output
  const { isSpeaking, setPokeDescriptionButtonClicked } = useVoiceOutput(
    pokeInfo?.pokeName,
    pokeInfo?.pokeDescription,
    currentPokeIndex,
  );

  function navPokeRight() {
    if (currentPokeIndex === undefined) setCurrentPokeIndex(1);
    else setCurrentPokeIndex((pokeInfo.pokeId = pokeInfo?.pokeId + 1));
  }
  function navPokeLeft() {
    if (currentPokeIndex !== 1 && pokeInfo) {
      setCurrentPokeIndex((pokeInfo.pokeId = pokeInfo?.pokeId - 1));
    }
  }
  useEffect(() => {
    setSearchText(currentPokeIndex);
  }, [currentPokeIndex]);

  return (
    <>
      <main>
        <h1>Talking Pokedex</h1>

        <div className="pokedexContainer">
          <div className="pokedexUILeft">
            <div className="leftSideContent">
              <div className="header">
                <button className="bigBlue-Btn">
                  <svg
                    className={
                      isSpeaking
                        ? 'innerBlue-BtnSVG-GLOWING'
                        : 'innerBlue-BtnSVG'
                    }
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M63.5 32C63.5 49.397 49.397 63.5 32 63.5C14.603 63.5 0.5 49.397 0.5 32C0.5 14.603 14.603 0.5 32 0.5C49.397 0.5 63.5 14.603 63.5 32Z"
                      fill="#28AAFD"
                      stroke="#1E1E1E"
                    />
                    <mask
                      id="mask0_2:23"
                      style={{ maskType: 'alpha' }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="64"
                      height="64"
                    >
                      <path
                        d="M63 32C63 49.1208 49.1208 63 32 63C14.8792 63 1 49.1208 1 32C1 14.8792 14.8792 1 32 1C49.1208 1 63 14.8792 63 32Z"
                        fill="#28AAFD"
                        stroke="#454545"
                        strokeWidth="2"
                      />
                    </mask>
                    <g mask="url(#mask0_2:23)">
                      <ellipse
                        cx="35.0968"
                        cy="36.129"
                        rx="28.9032"
                        ry="28.9032"
                        fill="#196A9E"
                      />
                    </g>
                    <path
                      d="M63.5 32C63.5 49.397 49.397 63.5 32 63.5C14.603 63.5 0.5 49.397 0.5 32C0.5 14.603 14.603 0.5 32 0.5C49.397 0.5 63.5 14.603 63.5 32Z"
                      stroke="#1E1E1E"
                    />
                    <ellipse
                      cx="23.7419"
                      cy="20.6452"
                      rx="13.4194"
                      ry="13.4194"
                      fill="#28AAFD"
                    />
                    <ellipse
                      cx="20.6452"
                      cy="16.5161"
                      rx="5.16129"
                      ry="5.16129"
                      fill="#A8DDFE"
                    />
                  </svg>
                </button>

                <div className="lilButtons">
                  <button
                    className="lil-Btn"
                    style={{ backgroundColor: '#FF0000' }}
                  ></button>
                  <button
                    className="lil-Btn"
                    style={{ backgroundColor: '#FFE600' }}
                  ></button>
                  <button
                    className="lil-Btn"
                    style={{ backgroundColor: '#308247' }}
                  ></button>
                </div>
              </div>

              <div className="mainContent">
                <div className="pokemonScreenContainer">
                  <div
                    className="pokemonScreen"
                    style={{
                      backgroundColor:
                        typeColors[pokeInfo?.pokeTypes[0].type.name],
                    }}
                  >
                    <img
                      src={pokeInfo ? pokeInfo.pokeSprite : pokeballImg}
                      alt={pokeInfo?.name}
                      height="96px"
                    />

                    <div className="pokeLeftInfo">
                      <p>#{pokeInfo && ('00' + pokeInfo.pokeId).slice(-3)}</p>
                      <p>|</p>
                      <p>{pokeInfo?.pokeName}</p>
                    </div>
                  </div>
                  <div className="pokeScreenCircle"></div>
                </div>

                <div className="buttonsContainer">
                  <button
                    title="descriptionButton"
                    className={
                      isSpeaking
                        ? 'descriptionButtonTalking'
                        : 'descriptionButton'
                    }
                    disabled={isSpeaking && pokeInfo ? true : false}
                    onClick={(e) => setPokeDescriptionButtonClicked(true)}
                  >
                    ?
                  </button>
                  <div
                    className="hButton"
                    style={{ backgroundColor: '#FF002C' }}
                  ></div>
                  <div
                    className="hButton"
                    style={{ backgroundColor: '#165D8A' }}
                  ></div>

                  <div className="greenScreen"></div>

                  <div className="crossContainer">
                    <div id="cross">
                      <div id={'leftcross'} onClick={(e) => navPokeLeft()}>
                        <div id="leftT"></div>
                      </div>
                      <div id={'rightcross'} onClick={(e) => navPokeRight()}>
                        <div id="rightT"></div>
                      </div>

                      <div id="topcross">
                        <div id="upT"></div>
                      </div>

                      <div id="midcross">
                        <div id="midCircle"></div>
                      </div>

                      <div id="botcross">
                        <div id="downT"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="midleBar">
              <svg
                width="40"
                height="453"
                viewBox="0 0 40 453"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 11.212C0.5 10.131 0.876822 9.0932 1.6082 8.34371C11.4963 -1.78936 26.7499 -1.94162 37.9958 6.94337C38.97 7.71309 39.5 8.9251 39.5 10.2028V437.54C39.5 438.321 39.1327 439.059 38.509 439.52C31.2959 444.845 25.6152 447.48 19.9894 447.5C14.3657 447.52 8.68627 444.928 1.47567 439.522C0.861063 439.062 0.5 438.329 0.5 437.555V11.212Z"
                  fill="url(#paint0_linear_2:87)"
                  stroke="#1E1E1E"
                />
                <path
                  d="M39.5 440C39.5 443.365 37.4014 446.478 33.8696 448.773C30.3427 451.066 25.4404 452.5 20 452.5C14.5596 452.5 9.65734 451.066 6.13036 448.773C2.59864 446.478 0.5 443.365 0.5 440C0.5 436.635 2.59864 433.522 6.13036 431.227C9.65734 428.934 14.5596 427.5 20 427.5C25.4404 427.5 30.3427 428.934 33.8696 431.227C37.4014 433.522 39.5 436.635 39.5 440Z"
                  fill="#89061C"
                  stroke="#1E1E1E"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2:87"
                    x1="0"
                    y1="205.749"
                    x2="40"
                    y2="205.749"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#DC0A2D" />
                    <stop offset="0.104167" stopColor="#DC0A2D" />
                    <stop offset="0.104267" stopColor="#E9677D" />
                    <stop offset="0.291567" stopColor="#E85F76" />
                    <stop offset="0.291667" stopColor="#DC0A2D" />
                    <stop offset="0.484375" stopColor="#DC0A2D" />
                    <stop offset="0.703125" stopColor="#DC0A2D" />
                    <stop offset="0.703225" stopColor="#89061C" />
                    <stop offset="1" stopColor="#89061C" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="pokedexUIRight">
            <div className="pokemonSearch">
              <h2>Pokemon Search</h2>
              <SearchInput
                placeholder={'Type a Pokemon Name or Nº'}
                value={searchText}
                onChange={(searchtxt) => setSearchText(searchtxt)}
              />
              {error && <Error error={error} />}
            </div>

            <div className="pokeStatsScreen">
              <div className="pokeStatsContainer">
                <div className="pokeStats">
                  <p>NO. {pokeInfo && pokeInfo.pokeId}</p>
                  <p>{pokeInfo && pokeInfo.pokeName}</p>
                </div>
                <div className="pokeStats">
                  <p>height</p>
                  <p>{pokeInfo?.pokeHeight}cm</p>
                </div>
                <div className="pokeStats">
                  <p>weigh</p>
                  <p>{pokeInfo?.pokeWeight}kg</p>
                </div>
              </div>

              <div className="pokeType">
                {pokeInfo ? (
                  pokeInfo.pokeTypes.map((type) => {
                    return (
                      <p
                        key={type.type.name}
                        style={{ backgroundColor: typeColors[type.type.name] }}
                      >
                        {type.type.name}
                      </p>
                    );
                  })
                ) : (
                  <>
                    <p style={{ border: '1px solid #1e1e1e' }}></p>
                    <p style={{ border: '1px solid #1e1e1e' }}></p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
