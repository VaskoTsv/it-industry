import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { useHttp } from '../../hooks/htpp.hook.js';
import { BASE_URL } from '../../constants.js';
import Loader from '../Loader.jsx';
import { useMessage } from '../../hooks/message.hook.js';
import { __BookmarksContainer, __BookmarkInformation } from '../styles/bookmarks-page.js';
import { Button } from '@blueprintjs/core';

export default function BookmarksPage() {
    const auth = useContext(AuthContext);
    const {request, isLoading} = useHttp();
    const {showSuccess, showError} = useMessage();

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userData = await request(
                `${BASE_URL}/api/users/${auth.userId}`,
                'GET',
            );

            setUser(userData);
        } catch (e) {
            if (!e.responseJSON) return;
            showError(e.responseJSON.message);
        }
    }

    const removeBookmark = async (companyId) => {
        try {
            const response = await request(
                `${BASE_URL}/api/users/${auth.userId}/bookmarked/${companyId}`,
                'DELETE',
            );

            setUser(response.user);
            showSuccess(response.message);
        } catch (e) {
            if (!e.responseJSON) return;
            showError(e.responseJSON.message);
        }
    }

    const handleRemoveFromBookmarks = async (company) => {
        const confirmation = confirm("Are you sure you want to remove the company from your bookmarks?");
        if (!confirmation) return;
        removeBookmark(company._id);
    }

    const renderCompany = (company) => {
        const {_id, name, city, eik, employees_count, revenue_formatted, profit_formatted} = company;
    
        return (
            <__BookmarkInformation key={_id}>
                <h3>{name}</h3>
                <h5>City: {city}</h5>
                <h5>EIK: {eik}</h5>
                <h5>Employees: {employees_count}</h5>
                <h5>Revenue: {revenue_formatted} BGN</h5>
                <h5>Profit: {profit_formatted} BGN</h5>
                <Button
                    icon="delete"
                    intent="danger"
                    text="Remove from bookmarks"
                    onClick={() => handleRemoveFromBookmarks(company)}
                />
            </__BookmarkInformation>
        )
    }

    const renderCompaniesList = () => {
        if (!user) return;

        return (
            <__BookmarksContainer>
                {!user.bookmarked_companies.length ?
                    <h4 className="bp3-heading">There are no saved companies...</h4> : null}
                {user.bookmarked_companies.map(c => renderCompany(c))}
            </__BookmarksContainer>
        );
    }

    return (
        <React.Fragment>
            <h1>Bookmarked companies</h1>
            {renderCompaniesList()}
            <Loader isLoading={isLoading} />
        </React.Fragment>
    );
}
