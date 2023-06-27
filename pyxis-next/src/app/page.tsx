import Image from 'next/image';
import pyxisLogo from "/public/images/pyxis-logo.svg";

import { useState } from "react"
import TestComponent from "./components/TestComponent"

function DaysOfTheWeek() {
  return <></>
}

export default function Home() {
  // TODO: Add universal data here
  const daysOfWeek = {
  }
  return (
    <>
    {/* TODO: all new timezone trouble */}
      <header id="header">
        <div id="user-info">
          <div className="menu">
            <div className="base-menu">
                <span>MENU</span>
                <i className="fa-solid fa-bars menu-button"></i>
                {/* @click="viewMenu = !viewMenu" */}
            </div>
            <div className="nav">  {/* :className="{'fullmenu':viewMenu}" */}
                <fieldset>
                    <legend className="sr-hidden">Themes</legend>
                    {/* <color-themes v-show="viewMenu"/> */}
                </fieldset>
                {/* {% if user.is_authenticated %} */}
                {/* <nav v-if="viewMenu"><a href="#">LOGOUT</a></nav>
                {% else %} */}
                <nav><a href="/registration/login">LOGIN</a></nav>
                {/* {% endif %} */}
                <nav v-if="viewMenu"><a href="/about">ABOUT</a></nav>
            </div>
          </div>
            <a href='/'><Image className="logo" priority src={pyxisLogo} alt="Pyxis"/></a>
            {/* <img src="{% static 'media/logo.svg' %}" className="logo"></img> */}
            <div className="auth">
                <h2>USERNAME</h2>
            </div>
            <nav className="auth">
                <a href="/registration/login">Login</a> or
                <a href="/registration/signup">Sign Up</a>
            </nav>
        </div>

              <div id="weekdates">
                  [[ weekStart ]] to [[ weekEnd ]]
              </div>

              <nav id="weekly-view">
                  <div className="prev-week">
                  {/* @click="weekPrev" */}
                      <i className="fa-solid fa-angles-left"></i>
                  </div>
                  {/* <div v-for="day in daysOfTheWeek" :id="day.name" className="weekday" :className="[{selectDay:todayWeekday === day.name}, {selectDay:today === day.name}, 
                          {weekahead: changeWeekNext}, {weekbehind: changeWeekPrev}]" @click="viewForDay(day.name)">
                      [[ day.abbrv ]]
                  </div> */}
                  <div className="weekday">S</div>
                  <div className="weekday">M</div>
                  <div className="weekday">T</div>
                  <div className="weekday">W</div>
                  <div className="weekday">T</div>
                  <div className="weekday">F</div>
                  <div className="weekday">S</div>

                  <div className="next-week">
                  {/* @click="weekNext" */}
                      <i className="fa-solid fa-angles-right"></i>
                  </div>
              </nav>
          </header>
          <TestComponent/>
    </>
  )
}
