import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import fidelityPoints from '../../ethereum/fido';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';


class CreateTokensForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        okMessage: '',
        loading: false,
    }

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true });

        try {
            console.log("value: " + this.state.value);
            const accounts = await web3.eth.getAccounts();
            console.log("value: " + this.state.value);
            const tokens = this.state.value * 1000000;
            console.log("tokens: " + tokens);
            await fidelityPoints.methods
            .createTokens()
            .send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            console.log("value: " + this.state.value);
            this.setState({ okMessage: tokens })

        } catch (err) {
            var trimmedString = err.message.substring(0, 101);
            this.setState({ errorMessage: trimmedString });
        }
        this.setState({ loading: false, value: ''});
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.okMessage}>
                <Form.Field>
                    <label>Amount to change in tokens</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Message success header="Ok!" content={`Successfull creation of ${this.state.okMessage} FIDO`} />
                <Button primary loading={this.state.loading}>
                    Create
                </Button>
            </Form>
        );
    }
}

export default CreateTokensForm;