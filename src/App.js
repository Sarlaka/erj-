import React, {Component} from 'react'

class Item extends Component{
    constructor(props){
        super(props)
        this.state={
            height: 0,
            toggle: true
        }
    }
    componentDidMount () {
        if(this.refs.submenu){
            this.setState({
                height: this.refs.submenu.children[0].offsetHeight+'px'
            })
        }
    }
    clickHandle (hasSub) {
        if(hasSub&&this.refs.submenu.offsetHeight!=0){
            this.setState({
                toggle: false
            })
        }else {
            this.setState({
                toggle: true
            })
        }
        this.props.currentHandle&&this.props.currentHandle()
    }
    render () {
        let {height,toggle} = this.state;
        let {show} = this.props;
        if(this.props.item.hasSub){
            return  <li>
                        <a className={show&&toggle?"item active":"item"} href="#" onClick={this.clickHandle.bind(this,this.props.item.hasSub)}>{this.props.item.name}</a>
                        <div className="submenu" ref="submenu" style={{height:show&&toggle?height:0}}>
                            <Dropdown menu={this.props.item.submenu}/> 
                        </div>
                    </li>
        }else{
            return  <li>
                        <a className={show?"active":""} href="#" onClick={this.clickHandle.bind(this,this.props.item.hasSub)}>{this.props.item.name}</a>
                    </li>
        } 
    }
}

class Dropdown extends Component{
    constructor(props){
        super(props)
    }
    render () {
        return (
            <ul className="level2nd">
                {this.props.menu.items.map((item)=>{
                    return <Item item={item}/>
                })}
            </ul>
        )
    }
}

class Menu extends Component{
    constructor(props){
        super(props)
        this.state={
            currentId: 0
        }
    }
    currentHandle (id) {
        this.setState({
            currentId: id
        })
    }
    render () {
        let {currentId} = this.state;
        return (
            <ul className="level1st">
                {this.props.menu.items.map((item, id)=>{
                    return <Item key={id} item={item} currentHandle={this.currentHandle.bind(this,id)} show={currentId==id}/>
                })}
            </ul>
        )
    }
}
class App extends Component {
    render () {
        var menu = {
            level: 0,
            items: [
                {name: "tab1",submenu: {
                    level: 1,
                    items: [
                        {name: "item1",submenu: null,hasSub:false},
                        {name: "item2",submenu: null,hasSub:false}
                    ]},hasSub:true},
                {name: "tab2",submenu: {
                    level: 1,
                    items: [
                        {name: "item1",submenu: null,hasSub:false},
                        {name: "item2",submenu: null,hasSub:false},
                        {name: "item3",submenu: null,hasSub:false}
                    ]},hasSub:true
                },
                {name: "tab3",submenu: null,hasSub:false},
                {name: "tab4",submenu: {
                    level: 1,
                    items: [
                        {name: "item1",submenu: null,hasSub:false},
                        {name: "item2",submenu: null,hasSub:false}
                    ]},hasSub:true
                },
                {name: "tab5",submenu: null,hasSub:false}
            ]
        }
        return (
            <div>
                <Menu menu={menu} />
            </div>
        )
    }
}

export default App