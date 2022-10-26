function checkAuth(nextState, replace, next) {
    
    const loginToken = localStorage.getItem("token")
    
    if (!loginok) {
        useEffect(() => {
            if (localStorage.getItem("token")) {
                setLoginok(true);
            }
        }, []);
    }
    next();
  }

export default checkAuth;