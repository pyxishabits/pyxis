// import Image from 'next/image'

export default function Home() {
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
                <nav><a href="#">LOGIN</a></nav>
                {/* {% endif %} */}
                <nav v-if="viewMenu"><a href="#">ABOUT</a></nav>
            </div>
          </div>
            <a href="/"><h2>PYXIS</h2></a>
            {/* <img src="{% static 'media/logo.svg' %}" className="logo"></img> */}
            <div className="auth">
                <h2>USERNAME</h2>
            </div>
            <nav className="auth">
                <a href="#">Login</a> or
                <a href="#">Sign Up</a>
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
    </>
  )
}
