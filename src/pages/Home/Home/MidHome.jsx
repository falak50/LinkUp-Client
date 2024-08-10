
import { useEffect, useState } from 'react';
import MyCard from '../../../not_includes/MyCard';
import PostSectionHome from './PostSectionHome';
import Posts from './Posts'
import axios from 'axios';
const MidHome = () => {


    return (
        <div >
        <PostSectionHome></PostSectionHome>
        <Posts></Posts>

        </div>
    );
};

export default MidHome;