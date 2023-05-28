import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Auth/Footer'
import { Header } from '../Auth/Header'


export const Layout = () => {
    return (
        <div className="AppDiv">
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>

        </div>
    )
}
