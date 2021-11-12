import axios from 'axios'
import CustomizedSnackbars from "./components/SnackBar";
import Alert from "@material-ui/lab/Alert";
import {Router} from "@material-ui/icons";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default class AxiosInterceptors extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: false,
            open:false,
            severity:"",
            msg:"",
            data:{},
        }

    }
    handleClose(event, reason){
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open:false})
    };
    componentWillMount() {
        axios.defaults.baseURL='http://1.15.141.72:8081'//上线
        axios.interceptors.request.use(config => {
            console.log("前置拦截")
            //config.headers
            // 可以统一设置请求头
            return config
        })

        axios.interceptors.response.use(response => {
                const res = response.data;
                console.log("后置拦截response")
                console.log(res)
                this.setState({
                    open: true,
                    msg:res.msg,
                    data:res.data
                })
                // 当结果的code是否为200的情况
                if (res.code === 200) {
                    this.setState({
                        severity:"success"
                    })
                    //this.props.history.replace('/')
                    return response

                } else {
                    this.setState({
                        severity:"error",
                    })
                    // 弹窗异常信息
                    // <Alert>1</Alert>
                    // Element.Message({
                    //     message: response.data.msg,
                    //     type: 'error',
                    //     duration: 2 * 1000
                    // })

                    // 直接拒绝往下面返回结果信息
                    return Promise.reject(response.data.msg)
                }
            },
            error => {
                console.log("后置拦截error")
                console.log('err' + error)// for debug
                this.setState({
                    open:true,
                    severity:"error",
                    msg: "Please check your username and password",
                })
                // if(error.response.data) {
                //     // error.message = error.response.data.msg
                //     this.setState({
                //         //msg: "后置拦截error",
                //         msg:error.response.data.msg,
                //         data:error.response.data
                //     })
                // }
                // 根据请求状态觉得是否登录或者提示其他
                //this.props.history.push('/')
                // if (error.response.status === 401) {
                //     // store.commit('REMOVE_INFO');
                //     localStorage.clear();
                //
                //     this.props.history.push('/')
                //     error.message = '请重新登录';
                //     this.setState({
                //         //msg: "后置拦截error",
                //         msg:"请重新登录"
                //
                //     })
                // }
                // if (error.response.status === 403) {
                //     error.message = "权限不足，无法访问";
                //     this.setState({
                //         //msg: "后置拦截error",
                //         msg:error.message
                //
                //     })
                // }
                // Element.Message({
                //     message: error.message,
                //     type: 'error',
                //     duration: 3 * 1000
                // })
                return Promise.reject(error)
            }
        )
    }
    render() {

            return(
                <Snackbar open={this.state.open} autoHideDuration={2000} onClose={()=>this.handleClose()}>
                    <Alert onClose={()=>this.handleClose()} severity={this.state.severity}>
                        {this.state.msg}
                        {/*{this.state.data}*/}
                    </Alert>
                </Snackbar>
            )


    }
}

