import React from 'react'

const Footer = () => {
    return (
        <>
            <footer>
                <div className="d-flex justify-content-between align-items-center flex-wrap bg-light p-3">
                    <div className="flex-1 d-flex gap-5">
                        <a href="." className="text-decoration-none text-muted fw-bold">Privicy Policy</a>
                        <a href="." className="text-decoration-none text-muted fw-bold">Term of Use</a>
                    </div>
                    <div className="flex-1 ">
                        <p className="p-0 m-0 text-muted  fw-bold">2023 GSK. All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer