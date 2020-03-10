const express = require('express');
const router = express.Router();
const Client = require('../../models/client');


// Create Client
router.post('/create', async (req, res) => {
  const client = new Client({
    clientName: req.body.clientName,
    clientAddress: req.body.clientAddress,
    clientEmail: req.body.clientEmail,
    clientPhone: req.body.clientPhone,
    clientAnotherPhone: req.body.clientAnotherPhone,
    clientCompanyName: req.body.clientCompanyName,
    clientRelatedNote: req.body.clientRelatedNote,
    createdBy: req.body.createdBy
  });

  if (!client.clientName || !client.clientAddress || !client.clientEmail || !client.clientPhone || !client.clientCompanyName || !client.clientRelatedNote || !client.createdBy) {
    return res.status(400).json({ statusCode: 200, status: false, msg: 'Please include all required fields' });
    
  }

  try {
    const newClient = await client.save()
    if(newClient != null) {
      res.json({statusCode: 200, status: true, msg: 'Client successfully saved' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Client not saved' })
    }

  } catch(err) {
    if(err) throw err;
  }
});


// get all clients
router.get('/', async (req, res) => {
  let clients;
  try {
    clients = await Client.find().exec()
    if(clients != null) {
      res.json({statusCode: 200, status: true, clients: clients })

    } else {
      res.json({ statusCode: 200, status: false, clients: [] })
    }

  } catch {
    if(err) throw err;
  }
})


// Update client
router.put('/:id', async (req, res) => {
  let client;
  try {
    client = await Client.findById(req.params.id)
    
    client.clientName = req.body.clientName,
    client.clientAddress = req.body.clientAddress,
    client.clientEmail = req.body.clientEmail,
    client.clientPhone = req.body.clientPhone,
    client.clientAnotherPhone = req.body.clientAnotherPhone,
    client.clientCompanyName = req.body.clientCompanyName,
    client.clientRelatedNote = req.body.clientRelatedNote,
    client.createdBy = req.body.createdBy
    
    if(!client.clientName || !client.clientAddress || !client.clientEmail || !client.clientPhone || !client.clientCompanyName || !client.clientRelatedNote || !client.createdBy) {
      return res.json({ statusCode: 200, status: false, msg: 'Please include all required fields' });
    } 

    const updatedClient = await client.save()

    if(updatedClient != null) {
      res.json({statusCode: 200, status: true, msg: 'Client successfully updated' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Client update failed' })
    }

  } catch(err) {
    if(err) throw err
  }
})



// Delete client
router.delete('/:id', async (req, res) => {
  let client;
  try {
    client = await Client.findById(req.params.id)

    const clientDeleted = await client.remove()

    if(clientDeleted) {
      res.json({statusCode: 200, status: true, msg: 'Client deleted successfully' })

    } else {
      res.json({ statusCode: 200, status: false, msg: 'Client delete failed' })
    }

  } catch {
    res.json({ statusCode: 200, status: false, msg: 'Client not found' })
  }
})


module.exports = router;
