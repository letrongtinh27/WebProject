import {Theme, useMediaQuery} from "@mui/material";
import React, {useMemo} from "react";
import ChartBox1 from "./ChartBox/ChartBox1";
import "./db.css";
import {useGetList} from "react-admin";
import {Movie, Theatre, Ticket, User} from "../../types";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MonitorOutlinedIcon from '@mui/icons-material/MonitorOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import BarChar from "./BarChar/BarChar";
import CustomPieChart from "./PieChart/PieChart";

const Spacer = () => <span style={{width: '1em'}}/>;
const VerticalSpacer = () => <span style={{height: '1em'}}/>;

const Dashboard = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));


    // xu li ngay thang nam
    const currentDate = new Date();
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = currentDate.getFullYear();
    const currentDateFormatted = `${currentDay}/${currentMonth}/${currentYear}`;
    const currentMonthYear = `${currentMonth}/${currentYear}`;
    const countQuarter = Math.floor(((parseInt(currentMonth) + 1) / 4) + 1);
    const firstMonthQuarter = `${String((countQuarter * 3) - 2).padStart(2, '0')}/${currentYear}`;
    const secondMonthQuarter = `${String((countQuarter * 3) - 1).padStart(2, '0')}/${currentYear}`;
    const thirdMonthQuarter = `${String((countQuarter * 3)).padStart(2, '0')}/${currentYear}`;
    // const listQuater = [firstMothQuater,secondMothQuater,thirdMothQuater]

    // lay ra danh sach can thiet
    const {data: getUsers} = useGetList<User>('users/all', {
        filter: {role: 'user'}
    });

    const {data: getTicketsInMonth} = useGetList<Ticket>('tickets/all', {
        filter: {reservation_time: currentMonthYear}
    });

    const {data: getRevenue1st} = useGetList<Ticket>('tickets/all', {
        filter: {reservation_time: firstMonthQuarter}
    });

    const {data: getRevenue2nd} = useGetList<Ticket>('tickets/all', {
        filter: {reservation_time: secondMonthQuarter}
    });
    const {data: getRevenue3rd} = useGetList<Ticket>('tickets/all', {
        filter: {reservation_time: thirdMonthQuarter}
    });

    const {data: getShows} = useGetList<Ticket>('shows/all', {
        filter: {start_time: currentMonthYear}
    });

    const {data: getMovies} = useGetList<Movie>('movies/all_filter', {
        filter: {
            released_date: currentDateFormatted, is_active: 0,
            sort: {field: 'title', order: 'ASC'}
        }
    });

    const {data: theatres} = useGetList<Theatre>('theatres/all',
        {
            sort: {field: 'name', order: 'ASC'},
        });


    // tinh ra cac gia tri hien thi
    const totalUsers = useMemo(() => getUsers ? getUsers.length : 0, [getUsers]);
    const totalTicketsInMonth = useMemo(() => getTicketsInMonth ? getTicketsInMonth.length : 0, [getTicketsInMonth]);
    const totalPriceOfTickets = useMemo(() => {
        if (!getTicketsInMonth) return 0;
        return getTicketsInMonth.reduce((total, ticket) => total + ticket.price, 0).toLocaleString('vi-VN');
    }, [getTicketsInMonth]);

    const revenueQuater = useMemo(() => {
        return [
            getRevenue1st ? getRevenue1st.reduce((total, ticket) => total + ticket.price, 0) : '0',
            getRevenue2nd ? getRevenue2nd.reduce((total, ticket) => total + ticket.price, 0) : '0',
            getRevenue3rd ? getRevenue3rd.reduce((total, ticket) => total + ticket.price, 0) : '0'
        ];
    }, [getRevenue1st, getRevenue2nd, getRevenue3rd]);


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

    const theatreName = totalPrices.map(item => item.theatreName);
    const totalPrice = totalPrices.map(item => item.totalPrice);

    const getMovieRevenue = useMemo(() => {
        if (!Array.isArray(getMovies) || !Array.isArray(getTicketsInMonth)) {
            return [] as { name: string, value: number }[];
        }

        const totalPrices: { name: string, value: number }[] = [];

        getMovies.forEach(movie => {
            console.log(movie)
            const ticketsInMovie = getTicketsInMonth.filter(ticket => ticket.showTime.movie.id === movie.id);
            const totalPrice = ticketsInMovie.reduce((sum, ticket) => sum + ticket.price, 0);
            console.log(ticketsInMovie)
            totalPrices.push({
                name: movie.title,
                value: totalPrice
            });
        });

        totalPrices.sort((a, b) => b.value - a.value);

        const topMovies = totalPrices.slice(0, 4);


        const otherMovies = totalPrices.slice(4);
        const otherTotalPrice = otherMovies.reduce((sum, movie) => sum + movie.value, 0);

        topMovies.push({
            name: 'other',
            value: otherTotalPrice
        });


        return topMovies;
    }, [getMovies, getTicketsInMonth]);

    // truyen props vao cac chart
    const TotalUser = {
        icon: <PersonOutlineOutlinedIcon/>,
        title: "Users",
        total: totalUsers,
        unit: "people",
    }
    const TotalRevenue = {
        icon: <AttachMoneyOutlinedIcon/>,
        title: "Monthly revenue",
        total: totalPriceOfTickets,
        unit: "VND",
    }

    const TotalShows = {
        icon: <MonitorOutlinedIcon/>,
        title: "Showtimes in the month",
        total: totalShows,
        unit: "shows",
    }
    const TotalTickets = {
        icon: <ConfirmationNumberOutlinedIcon/>,
        title: "Tickets sold",
        total: totalTicketsInMonth,
        unit: "tickets",
    }
    const Barchar = {
        title: "Revenue Theatres - This Month:",
        name: theatreName,
        totalPrice: totalPrice,
        height: isSmall ? 300: 650
    }
    const RevenueQuater = {
        title: "Revenue Quarter:",
        name: [firstMonthQuarter, secondMonthQuarter, thirdMonthQuarter],
        totalPrice: revenueQuater,
        height: isSmall ? 300: 450
    }
    const RevenueMovie = {
        title: "Revenue Movies:",
        data: getMovieRevenue
    }

    return (
        <div>
            <div className={`home ${isSmall ? 'home-small' : ''}`}>
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
                    <BarChar {...RevenueQuater}/>
                </div>
                <div className="box box7"><CustomPieChart {...RevenueMovie}/></div>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Dashboard;