import React from 'react';
import { Link } from 'react-router-dom';
import backIcon from '../../assets/images/icons/back.svg'
import logo from '../../assets/images/logo.svg'
import './styles.css'

interface PageHeaderProps { //Declaring the props types
    title: string;
    desc?: string; // Use "?" for non-mandatory props
}
// Creating PageHeader Component
const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => { //"props" receive PageHeaderProps data
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logo} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong>
                    {props.title}
                </strong>
                {/* if desc exists, insert a paragraph */}
                { props.desc && <p> { props.desc } </p> } 
                {props.children}
            </div>
        </header>
    );
}

export default PageHeader;