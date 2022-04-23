import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                    <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
        </div>
    )
}

function RenderComments({comments}) {
    if(comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comments => 
                <div key={comments.id}>
                    {comments.text}
                    <p>--{comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))} </p>
                </div>)
                }
                <CommentForm />
            </div>
        );
    }
    return <div />
}

    function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite = {props.campsite}></RenderCampsite>
                    <RenderComments comments={props.comments} />
                </div>
                </div>
            );
        }
        return <div />
    }

    class CommentForm extends Component{
        constructor(props) {
            super(props);
            this.state = {
              isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit(values) {
            console.log("Current state is: " + JSON.stringify(values));
            alert("Current state is: " + JSON.stringify(values));
        }
        
        
    
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        render() {
            return (
                <div>
                <Button type="submit" outline onClick={this.toggleModal}>
                <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>   
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm  onSubmit={values => this.handleSubmit(values)}>
                        <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <Control.select model=".rating" id="rating" name="rating" placeholder="Rating"
                                        className="form-control">
                                        <option value="one">1</option>
                                        <option value="two">2</option>
                                        <option value="three">3</option>
                                        <option value="four">4</option>
                                        <option value="five">5</option>

                        </Control.select>
                                    
                                   
                        </div>
                        <div className="form-group">
                        <label htmlFor="author">Your Name</label>
                        <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                        </div>
                        <div className="form-group">
                        <label htmlFor="comment">Comment</label>
                        <Control.textarea model=".text" id="text" name="text"
                                        placeholder="Comment"
                                        rows="6"
                                        className="form-control"
                                       
                                    />
                                   
                        </div>
                        <Button type="submit" value="submit" color="primary">
                                Submit
                            </Button>   
                            </LocalForm>
                            </ModalBody>
                </Modal>

                </div>
            )
                
        }
    }
   
    
export default CampsiteInfo;