import React, {Component} from 'react';
import ReactNative, {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image, TouchableWithoutFeedback,
    TextInput,
    KeyboardAvoidingView,
    ScrollView, Keyboard,
    Platform
} from 'react-native';
import PropTypes from "prop-types";
import TextInputState from 'react-native/lib/TextInputState';

function mapStateToProps(state) {
    return {
        ...state
    };
}

/**
 * author kangsx
 */

/**
 * title:弹窗标题
 * closeAction:点击关闭弹窗
 *
 * type 0:点餐明细（退餐）
 * textReason: 原因
 * textUser:用户名
 * textPassWd:密码（安全校验）
 * textHint: ‘输入单价不合理’ 等
 *
 * type:1:开价菜
 * textName：菜品名称
 * textPrice：菜品单价
 * nameEditable:菜品名称的可点击性
 * priceEditable：菜品单价的可点击性
 * namePlaceholder:菜品名称的提醒值
 * pricePlaceholder：菜品单价的提醒值
 * textHint: ‘单价输入不合法’ 等
 *
 * type:2:整单备注
 * textRemark：整单备注
 */

//正则匹配，校验通过
// if(/^[0-9]+(.[0-9]{1,2})?$/.test(this.state.textPrice)){}
export default class EditModal extends Component {

    static propTypes = {
        title: PropTypes.string,
        type: PropTypes.number,
        nameEditable: PropTypes.bool,
        priceEditable: PropTypes.bool,
        namePlaceholder: PropTypes.string,
        pricePlaceholder: PropTypes.string,

        //带值进入显示
        textUser: PropTypes.string,
        textHint: PropTypes.string,
        textReason: PropTypes.string,
        textPassWd: PropTypes.string,
        textRemark: PropTypes.string,
        textName: PropTypes.string,
        textPrice: PropTypes.string,

        next: PropTypes.func,
        closeAction: PropTypes.func,
    };

    static defaultProps = {
        title: '退菜',
        type: 0,
        nameEditable: true,
        priceEditable: true,
        namePlaceholder: '',
        pricePlaceholder: '',

        textUser: '',
        textHint: '',
        textReason: '',
        textPassWd: '',
        textRemark: '',
        textName: '',
        textPrice: '',

        closeAction: () => {
        },
        next: () => {
        }
    };


    constructor(props) {
        super(props);
        this.state = {
            textHint: props.textHint,
            textReason: props.textReason,
            textUser: props.textUser,
            textPassWd: props.textPassWd,
            textRemark: props.textRemark,
            textName: props.textName,
            textPrice: props.textPrice,

            nameFocus: !props.textName,

            btnColor: false,
        };

        this.currentlyFocusedID = null;
    }

    componentWillReceiveProps(nextPros) {
        this.setState({
            textHint: nextPros.textHint,
        })
    }

    // //带预设值的初始化进入button为可点击
    // componentWillMount() {
    //     this.clickNext();
    // }

    render() {
        let viewType = viewType = (<View style={styles.inputBorder}>
            <TextInput
                value={this.state.textRemark}
                placeholder={'请在此输入备注...'}
                autoFocus={true}
                multiline={true}
                underlineColorAndroid='transparent'
                style={styles.input}
                onChangeText={(text) => {
                    this.setState({
                        textRemark: text,
                    });
                }}
            />
        </View>);

        let btnState = this.clickNext();
        return (
            Platform.OS === 'ios' ?
                <View style={styles.container}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            if(Platform.OS === 'ios'){
                                if (this.currentlyFocusedID){
                                    TextInputState.focusTextInput(this.currentlyFocusedID);
                                    TextInputState.blurTextInput(this.currentlyFocusedID);
                                }
                            }
                            Keyboard.dismiss();
                        }}>
                        <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, width: null,}}/>
                    </TouchableWithoutFeedback>
                    <KeyboardAvoidingView style={[styles.avoidingViewContent, {backgroundColor: 'transparent'}]}
                                          behavior={"position"} keyboardVerticalOffset={-300}>
                        <View style={styles.viewContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>{this.props.title}</Text>
                                <TouchableOpacity style={styles.close} onPress={() => {
                                    this.props.closeAction && this.props.closeAction();
                                }}>
                                    <Image resizeMode={'contain'} source={require('./image/close.png')}
                                           style={styles.closeimg}/>
                                </TouchableOpacity>

                            </View>

                            {viewType}

                            <TouchableOpacity
                                activeOpacity={this.state.btnColor ? 0 : 1.0}
                                style={styles.btnBg}
                                onPress={() => {
                                    if (btnState) {
                                        this._next();
                                    }
                                }}>
                                <Text style={styles.btnText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View> :
                <KeyboardAvoidingView style={styles.container} behavior={"position"}
                                      keyboardVerticalOffset={-height * 0.45}>
                    <View style={styles.viewContainer}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{this.props.title}</Text>
                            <TouchableOpacity style={styles.close} onPress={() => {
                                this.props.closeAction && this.props.closeAction();
                            }}>
                                <Image resizeMode={'contain'} source={require('./image/close.png')}
                                       style={styles.closeimg}/>
                            </TouchableOpacity>

                        </View>

                        {viewType}

                        <TouchableOpacity
                            activeOpacity={this.state.btnColor ? 0 : 1.0}
                            style={styles.btnBg}
                            onPress={() => {
                                if (btnState) {
                                    this._next();
                                }
                            }}>
                            <Text style={styles.btnText}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
        );
    }

    _next() {
        switch (this.props.type) {
            case 0:
                this.props.next(this.state.textReason, this.state.textUser, this.state.textPassWd);
                break;
            case 1:
                this.props.next(this.state.textName, this.state.textPrice);
                break;
            case 2:
                this.props.next(this.state.textRemark);
                break;
            default:
                break;
        }
    }

    clickNext() {
        switch (this.props.type) {
            case 0: {
                //退菜类型的button颜色变化
                if (this.state.textReason.length > 0 && this.state.textUser.length > 0 && this.state.textPassWd.length > 0) {
                    return true;
                } else {
                    return false;
                }
            }
            case 1: {
                //开价菜的button颜色变化
                if (this.state.textName.length > 0 && this.state.textPrice.length > 0) {
                    return true;
                } else {
                    return false;
                }
            }
            case 2: {
                if (this.state.textRemark.length > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }


}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewContainer: {
        width: 380,
        alignSelf: 'center',
        borderRadius: 5,
        overflow: 'hidden',
    },
    title: {
        justifyContent: 'center',
        height: 45,
        flexDirection: "row",
    },
    titleText: {
        fontSize: 18,
        alignSelf: 'center',
    },
    close: {
        position: 'absolute',
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
    },
    closeimg: {
        width: 13,
        height: 13,
    },
    textHint: {
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    view: {
        flexDirection: 'row',
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 10,
        justifyContent: 'center',
    },
    view1: {
        flexDirection: 'row',
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
    },
    inputReasonBorder: {
        height: 90,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingVertical: 0,
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
    },
    inputBorder: {
        marginTop: 30,
        alignSelf: 'center',
        width: 330,
        height: 150,
        borderWidth: 1,
        borderRadius: 5,
    },
    input: {
        textAlignVertical: 'top',
        flex: 1,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 7,
        paddingRight: 7,
        fontSize: 16,
        paddingVertical: 0,
    },
    inputOther: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 7,
        paddingRight: 7,
        fontSize: 16,
        paddingVertical: 0,
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
    },
    btnBg: {
        marginBottom: 25,
        marginTop: 20,
        borderRadius: 5,
        width: 230,
        height: 42,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 18,
        alignSelf: 'center',
    },
    avoidingViewContent: {
        marginTop: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});