import React, { Component } from 'react'
import { Layout } from 'antd'
import HeaderAdmin from '../../../common/HeaderAdmin'
import SiderAdmin from '../../../common/SiderAdmin'
import ContentAdmin from '../../../common/ContentAdmin'
import Footer from '../../../common/Footer'

export class waiting extends Component {
    render() {
        return (
            <div>
                <HeaderAdmin/>
                <Layout>
                    <SiderAdmin/>
                    <ContentAdmin/>  
                </Layout>
                <Footer/>
            </div>
        )
    }
}

export default waiting
