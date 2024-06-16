import { Theme, useMediaQuery } from "@mui/material";
import React, { useMemo } from "react";
import ChartBox1 from "./ChartBox/ChartBox1";
import "./db.css";
import { useGetList } from "react-admin";
import { Movie, Theatre, Ticket, User } from "../../types";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MonitorOutlinedIcon from '@mui/icons-material/MonitorOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import BarChar from "./BarChar/BarChar";
const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {

    const currentDate = new Date();
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = currentDate.getFullYear();
    const currentDateFormatted = `${currentDay}/${currentMonth}/${currentYear}`;

    const currentMonthYear = `${currentMonth}/${currentYear}`;

    const { data: getUsers } = useGetList<User>('users/all', {
        filter: { role: 'user' }
    });

    const { data: getTicketsInMonth } = useGetList<Ticket>('tickets/all', {
        filter: { reservation_time: currentMonthYear }
    });

    const { data: getShows } = useGetList<Ticket>('shows/all', {
        filter: { start_time: currentMonthYear }
    });
    const { data: getMovies } = useGetList<Movie>('movies/all_filter', {
        filter: { release_date: currentDateFormatted, is_active: 0 }
    });
    const { data: theatres } = useGetList<Theatre>('theatres/all',
        {
            sort: { field: 'name', order: 'ASC' },
        });

    const totalUsers = useMemo(() => getUsers ? getUsers.length : 0, [getUsers]);
    const totalTicketsInMonth = useMemo(() => getTicketsInMonth ? getTicketsInMonth.length : 0, [getTicketsInMonth]);
    const totalPriceOfTickets = useMemo(() => {
        if (!getTicketsInMonth) return 0;
        return getTicketsInMonth.reduce((total, ticket) => total + ticket.price, 0).toLocaleString('vi-VN');
    }, [getTicketsInMonth]);
    const totalShows = useMemo(() => getShows ? getShows.length : 0, [getShows]);

    const totalPrices = useMemo(() => {
        if (!Array.isArray(theatres) || !Array.isArray(getTicketsInMonth)) {
            return [] as { theatreName: string, totalPrice: number }[];
        }
        const theatreNames = theatres.map(theatre => theatre.name);

        const totalPrices: { theatreName: string, totalPrice: number }[] = [];

        theatreNames.forEach(theatreName => {
            const ticketsInTheatre = getTicketsInMonth.filter(ticket => ticket.showTime.theatre.name === theatreName);

            const totalPrice = ticketsInTheatre.reduce((sum, ticket) => sum + ticket.price, 0);

            totalPrices.push({
                theatreName: theatreName,
                totalPrice: totalPrice
            });
        });

        return totalPrices;
    }, [theatres, getTicketsInMonth]);
    console.log(totalPrices)
    const theatreName = totalPrices.map(item => item.theatreName);
    const totalPrice = totalPrices.map(item => item.totalPrice);

    const TotalUser = {
        icon: <PersonOutlineOutlinedIcon />,
        title: "Users",
        total: totalUsers,
        unit: "people",
    }
    const TotalRevenue = {
        icon: <AttachMoneyOutlinedIcon />,
        title: "Monthly revenue",
        total: totalPriceOfTickets,
        unit: "VND",
    }

    const TotalShows = {
        icon: <MonitorOutlinedIcon />,
        title: "Showtimes in the month",
        total: totalShows,
        unit: "shows",
    }
    const TotalTickets = {
        icon: <ConfirmationNumberOutlinedIcon />,
        title: "Tickets sold",
        total: totalTicketsInMonth,
        unit: "tickets",
    }
    const Barchar = {
        theatreName: theatreName,
        totalPrice: totalPrice
    }

    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('lg')
    );

    return (
        <div>
            <div className={"home"}>
                <div className="box box1">
                    <ChartBox1 {...TotalUser} />
                </div>
                <div className="box box1">
                    <ChartBox1 {...TotalRevenue} />
                </div>
                <div className="box box1">
                    <ChartBox1 {...TotalShows} />
                </div>
                <div className="box box1">
                    <ChartBox1 {...TotalTickets} />
                </div>
                <div className="box box2">
                  <BarChar {...Barchar}/>
                </div>
                <div className="box box3">
                    chart3
                </div>
                <div className="box box7">chart2</div>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Dashboard;