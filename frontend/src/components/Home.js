import SubmitButton from "./SubmitButton";

const Home = ({UserStore, doLogout}) => {
    return (
        <>
        Welcome {UserStore.first_name}
        <SubmitButton
        text='Logout'
        onClick={() => doLogout()}
        />
        <ul>
            <li><a href="/"> admin dashboard </a></li>
            <li><a href="/admin/all-moderators"> All moderators </a></li>
            <li><a href="/admin/create-moderators"> Create moderator </a></li>
        </ul>
        </>
    );
}
 
export default Home;