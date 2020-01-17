import React from 'react';
import {Field, reduxForm} from 'redux-form';




const SearchForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Search users' name='searchForm' component='input' />
            </div>
        </form>
    )
}
export const SearchFormRedux = reduxForm({form: 'search'})(SearchForm)






export default SearchForm
