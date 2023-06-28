import axios from 'axios'
import Image from 'next/image'
import pyxisLogo from "/public/images/pyxis-logo.svg"

import { useState } from "react"
import WeekDisplay from  "./components/WeekDisplay"

const daysOfTheWeek = [
  { name: 'sunday', abbrv: 'S' },
  { name: 'monday', abbrv: 'M' },
  { name: 'tuesday', abbrv: 'T' },
  { name: 'wednesday', abbrv: 'W' },
  { name: 'thursday', abbrv: 'T' },
  { name: 'friday', abbrv: 'F' },
  { name: 'saturday', abbrv: 'S' },
]

export default function Home() {
  // TODO: Add universal data here
  // figure out how to pass through children
  return (
    <>
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
            <a href="/">
              <Image className="logo" priority src={pyxisLogo} alt="pyxis"/>
            </a>
            <div className="auth">
                <h2>USERNAME</h2>
            </div>
            <nav className="auth">
                <a href="/registration/login">Login</a> or
                <a href="/registration/signup">Sign Up</a>
            </nav>
        </div>

      <WeekDisplay daysOfTheWeek={ daysOfTheWeek }/>
      </header>
    </>
  )
}
