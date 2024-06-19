import { nanoid } from "nanoid";
import shortUrlModel from "../model/url.model.js";

class ShortURL
{
    static async createShortURL(req, res, next)
    {
        const {url} = req.body
        const {aud} = req.payload

        try 
        {
            if(!url)
            {
                res.status(400).send({message: "Provide a valid url"})
            }

            const urlExists = await shortUrlModel.findOne({url})

            if(urlExists && urlExists.userId == aud)
            {
                const existURI = `${process.env.API_URI}/short-url/${urlExists.shortId}`
                return res.status(200).send({shortId: existURI})
            }

            const shortUrl = await shortUrlModel.create({
                url: url,
                shortId: nanoid(7),
                userId: aud
            })

            const shortURI = `${process.env.API_URI}/short-url/${shortUrl.shortId}`

            res.status(200).send({shortId: shortURI})

        } 
        catch (error) 
        {
            console.log("URL Creation Error: ", error);
            next(error);
        }
    }

    static async getShortURL(req, res, next)
    {
        const {shortId} = req.params
        try 
        {
            const result = await shortUrlModel.findOne({shortId});
            if(!result)
            {
                return res.status(400).send({message: "Short URL doesn't exist"})
            }
            
            result.hitCount++;
            await result.save();
            res.redirect(result.url)

        } 
        catch (error) 
        {
            console.log("Retrieve Short Url Error: ", error);
            next(error)
        }
    }

    static async dashboard(req, res, next)
    {
        const {aud} = req.payload

        try 
        {
            const shortUrls = await shortUrlModel.find({userId: aud}).sort({createdAt: 'asc'})

            const urlData = shortUrls.map(data => {
                const urlDate = data.createdAt;

                return {
                    url: data.url,
                    shortId: data.shortId,
                    hitCount: data.hitCount,
                    day: urlDate.getDate(),
                    month: urlDate.getMonth(),
                    year: urlDate.getFullYear()
                }
            })

            res.status(200).send(urlData)
        } 
        catch (error) 
        {
            console.log("Retrieve User data Error: ", error);
            next(error)
        }
    }

    static async getAllUrls(req, res, next)
    {
        const {aud} = req.payload

        try 
        {
            const user = await shortUrlModel.find({userId: aud}).populate('userId').sort({createdAt: 'asc'})
            res.send(user)
        } 
        catch (error) 
        {
            console.log("Retrieve all URL Error: ", error);
            next(error)
        }
    }

    static async urlCount(req, res, next)
    {
        try 
        {
           const users = await shortUrlModel.find();

           const totalCount = users.reduce((acc, count) => acc += count.hitCount, 0)
           res.send({totalCount})
        } 
        catch (error) 
        {
            console.log("Retrieve URL count Error: ", error);
            next(error)
        }
    }
}

export default ShortURL