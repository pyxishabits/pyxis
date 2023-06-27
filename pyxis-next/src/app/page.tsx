import axios from 'axios'
import Image from 'next/image'
import pyxisLogo from "/public/images/pyxis-logo.svg"

import { useState } from "react"
import WeekDisplay from  "./components/WeekDisplay"

export default function Home() {
  // TODO: Add universal data here
  // figure out how to pass through children

  const daysOfWeek = {
    0: { name: 'sunday', abbrv: 'S' },
    1: { name: 'monday', abbrv: 'M' },
    2: { name: 'tuesday', abbrv: 'T' },
    3: { name: 'wednesday', abbrv: 'W' },
    4: { name: 'thursday', abbrv: 'T' },
    5: { name: 'friday', abbrv: 'F' },
    6: { name: 'saturday', abbrv: 'S' },
  }

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
                <nav><a href="#">LOGIN</a></nav>
                {/* {% endif %} */}
                <nav v-if="viewMenu"><a href="#">ABOUT</a></nav>
            </div>
          </div>
            <a href="/">
              <Image className="logo" priority src={pyxisLogo} alt="pyxis"/>
            </a>
            <div className="auth">
                <h2>USERNAME</h2>
            </div>
            <nav className="auth">
                <a href="#">Login</a> or
                <a href="#">Sign Up</a>
            </nav>
        </div>

          <WeekDisplay/>
          </header>
    </>
  )
}
