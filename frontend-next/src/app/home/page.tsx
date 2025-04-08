"use client";

import React, { useRef, useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useGenericText } from "@/context/GenericTextProvider";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";

const HomePage = () => {
  const { genericText } = useGenericText();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { language } = useLanguage();

  const [displayText, setDisplayText] = useState("");
  const [fade, setFade] = useState(true);
  const [index, setIndex] = useState(0);
  const fullText = genericText.home_welcome || "";

  const exampleVideo = "assets/video/【松江布】专题片.mp4"
  const videoThumbnail = "assets/images/video-thumbnail.jpg"

  const handlePlay = () => {
    if (videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play();
    } else {
      console.log("Video reference is null");
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const getIntervalDuration = () => {
      switch (language) {
        case "en":
        case "gr":
        case "ru":
          return 50;
        default:
          return 100;
      }
    };

    if (fade) {
      interval = setInterval(() => {
        setDisplayText(fullText.slice(0, index + 1));
        setIndex((prev) => prev + 1);
      }, getIntervalDuration());
    }

    if (index === fullText.length) {
      setTimeout(() => {
        setFade(false);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [language, index, fade, fullText]);

  useEffect(() => {
    if (!fade) {
      setIndex(0);
      setTimeout(() => {
        setDisplayText("");
        setFade(true);
      }, 500);
    }
  }, [fade]);

  return (
    <>
      <Head>
        <title>{genericText.title}</title>
      </Head>
      <Navbar />
      <main>
        <div className="bg-body-tertiary">
          <h1 className="text-center m-5 p-3 bg-dark bg-gradient text-white rounded fs-2" style={{ minHeight: "2.2em" }}>
            <span style={{ opacity: fade ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>{displayText}</span>
          </h1>
          <div className="container d-flex justify-content-center align-items-center">
              <div className="row mt-3 d-flex align-items-stretch">
                  <div className="col-md-6 text-center d-flex flex-column justify-content-center">
                      <div className="video-container position-relative w-100">
                        {!isPlaying && (
                          <img
                            src={videoThumbnail}
                            alt="Video Thumbnail"
                            className="w-100"
                            style={{ cursor: "pointer" }}
                            onClick={handlePlay}
                          />
                        )}

                        {!isPlaying && (
                          <button
                            ref={buttonRef}
                            className="btn btn-primary position-absolute top-50 start-50 translate-middle"
                            style={{ zIndex: 2 }}
                            onClick={handlePlay}
                          >
                            ▶ {genericText.play_video}
                          </button>
                        )}
                          
                        <video
                          ref={videoRef}
                          id="previewVideo"
                          className="w-100"
                          controls
                          preload="none"
                          style={{ display: isPlaying ? "block" : "none" }}
                          onEnded={handleEnded}
                        >
                          <source src={exampleVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="m-3 text-secondary">
                        {(genericText?.video_desc || "").split("\n").map((paragraph: string, index: number) => (
                          <p key={index} className="m-1">{paragraph}</p>
                        ))}
                      </div>
                  </div>

                  <div className="col-md-6 d-flex flex-column">
                      <div className="p-4 bg-white rounded">
                          <h2 className="m-1 mb-3">{genericText.home_welcome}</h2>
                          {(genericText?.home_desc || "").split("\n").map((paragraph: string, index: number) => (
                            <p key={index} className="m-1" style={{ textIndent: "2rem" }}>{paragraph}</p>
                          ))}
                      </div>

                      <div className="mb-4 d-flex justify-content-center w-100 flex-grow-1">
                          <Link href="/china/articles" className={`btn btn-danger text-white m-3 flex-grow-1 d-flex align-items-center justify-content-center ${language === 'en' || language === 'gr' || language === 'ru' ? 'fs-4' : 'fs-3'}`}>
                            <div>
                              {(genericText?.default_articles || "").split("\n").map((paragraph: string, index: number) => (
                                <p key={index} className="m-0" style={ language === 'ru' ? { wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-all" } : {}}>{paragraph}</p>
                              ))}
                            </div>
                          </Link>
                          <Link href="/songjiang/articles" className={`btn btn-primary text-white m-3 flex-grow-1 d-flex align-items-center justify-content-center ${language === 'en' || language === 'gr' || language === 'ru' ? 'fs-4' : 'fs-3'}`}>
                            <div>
                              {(genericText?.special_articles || "").split("\n").map((paragraph: string, index: number) => (
                                <p key={index} className="m-0" style={ language === 'ru' ? { wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-all" } : {}}>{paragraph}</p>
                              ))}
                            </div>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
