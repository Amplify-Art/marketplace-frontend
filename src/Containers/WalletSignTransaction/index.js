import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as nearAPI from "near-api-js";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { TransactionManager } from 'near-transaction-manager'
const { keyStores, WalletConnection, utils } = nearAPI;
// console.log(nearAPI, 'nearAPI')

function Header(props) {
    const user = jwt.decode(localStorage.getItem('amplify_app_token'));

    const [wallet, setWallet] = useState(null);
    const [isWalletSigned, setIsWalletSigned] = useState(user && user.near_connected);
    const [balance, setBalance] = useState(null);
    const [nearPrice, setNearPrice] = useState(0);
    const [search, setSearch] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(false);
    const wrapperRef = useRef(null);


    let path = 'test';
    useEffect(async () => {
        const config = {
            networkId: 'testnet',
            keyStore: new keyStores.BrowserLocalStorageKeyStore(),                               // optional if not signing transactions
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
            explorerUrl: 'https://explorer.testnet.near.org'
        };
        const near = await nearAPI.connect(config);
        const wallet = new WalletConnection(near);
        setWallet(wallet)
    }, [])
    useEffect(async () => {
        console.log(wallet, 'wallet')
        if (wallet && !isWalletSigned) {
            wallet.requestSignIn(
                user.near_account_id,     // contract requesting access 
                "Example App",                  // optional
                `${window.location.origin}/near/success`,  // optional
                `${window.location.origin}/near/failure`   // optional
            );
        }
    }, [wallet])

    const onConnect = () => {
        if (wallet.isSignedIn()) {
            return
        } else
            wallet.requestSignIn(
                "test",     // at this time, , we dont have account, passing test
                "Example App",                  // optional
                `${window.location.origin}/near/success`,  // optional
                `${window.location.origin}/near/failure`   // optional
            );
    }

    const getAccountDetails = async () => {
        console.log(wallet, 'wallet')
        const config = {
            networkId: 'testnet',
            keyStore: new keyStores.BrowserLocalStorageKeyStore(),                               // optional if not signing transactions
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
            explorerUrl: 'https://explorer.testnet.near.org'
        };
        try {
            const near = await nearAPI.connect(config);
            const account = await near.account(user.near_account_id);

            let balances = await account.getAccountBalance();
            console.log(balances, 'balances')
            const transactionManager = TransactionManager.fromAccount(account);
            const DEFAULT_FUNCTION_CALL_GAS = '300000000000000'
            const outcomes = await transactionManager.bundleCreateSignAndSendTransactions([
                {
                    receiverId: user.near_account_id,
                    actions: [account.functionCall("pixeltest2.testnet", "nft_mint", {
                        token_id: 'token_id23232',
                        metadata: {},
                        token_type: 'albumhash232423',
                        perpetual_royalties: {
                        },
                        songslist: ['q23213,312312']
                    }, DEFAULT_FUNCTION_CALL_GAS, [])],
                },
                // {
                //     receiverId: "pixeltest2.testnet",
                //     actions: [account.functionCall("nft_mint", {}, DEFAULT_FUNCTION_CALL_GAS, [])],
                // },
                // {
                //     receiverId: "pixeltest2.testnet",
                //     actions: [account.functionCall("nft_mint", {}, DEFAULT_FUNCTION_CALL_GAS, [])],
                // },
                // {
                //     receiverId: "pixeltest2.testnet",
                //     actions: [account.functionCall("nft_mint", {}, DEFAULT_FUNCTION_CALL_GAS, [])],
                // },
            ]).then(res => {
                console.log(res, 'RES')
            }).catch(err => {
                console.log(err)
            });
            console.log(outcomes, 'outcomes')
            setBalance(balances)
        } catch (e) {
            console.error(e);
        }
    }

    const onCreate = async () => {

    }

    useEffect(() => {
        if (isWalletSigned) {
            getAccountDetails()
        }
    }, [isWalletSigned]);

    const setBreadCrumbs = () => {
        let currentPage = '';

        switch (path) {
            case '/albums':
                currentPage = 'Albums';
                break
            case '/my-profile':
                currentPage = 'My Profile';
                break
            case path.includes('/artist/'):
                // Need to pull this from the database response... leaving it hard-coded for now... TODO!!
                currentPage = 'Eminem';
                break;
            case '/transaction-list':
                currentPage = 'Transactions'
        }
        return currentPage;
    }

    const handleSearch = async (e) => {
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        if (e.target.value && (e.key === 'Enter' || e.keyCode === 13)) {
            props.searchRes(e.target.value)
            props.history.push(`/search-result?search=${search}`)
        }
    }
    const userToken = localStorage.getItem('amplify_app_token');

    let userDetails = {};

    if (userToken) {
        userDetails = jwt_decode(userToken);
    }

    const getNearPrice = () => {
        // https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD
        axios.get('https://min-api.cryptocompare.com/data/price?fsym=NEAR&tsyms=NEAR,USD').then(res => {
            setNearPrice(res.data.USD);
        });
    }

    const handleClickOutside = (event) => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setShowSearchResult(false);
        }
    };

    const handleSearchClicked = (type, data) => {
        if (type === 'Artist') {
            props.history.push(`/artist/${data.id}`);
            setShowSearchResult(false);
        } else if (type === 'Album') {
            props.history.push(`/search-result?search=${search}`);
            props.setSelectedAlbum({ albumData: data });
            props.setIsAlbumSelected({ isAlbumSelected: true });
            setShowSearchResult(false);
        } else {
            props.history.push(`/search-result?search=${search}`);
            props.setIsSongSelected();
            setShowSearchResult(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickNFTMethod = () => {
        console.log('CLiCKED')
        getAccountDetails()
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <button onClick={handleClickNFTMethod}>Call NFT method</button>
        </div>
    );
}

export default connect(state => {
    return {
    }
}, dispatch => {
    return {
    }
})(withRouter(Header));
